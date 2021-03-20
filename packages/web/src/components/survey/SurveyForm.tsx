import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import { Survey, Submission, Response } from '@compass-surveys/common';
import QuestionCard from './questions/QuestionCard';
import QuestionContent from './questions/QuestionContent';
import { SERVER_URL } from '../../config';
import SurveyTitle from './SurveyTitle';

interface Props {
  className?: string;
  survey: Survey;
  onSubmit: () => void;
  onSubmitComplete: (submission: Submission) => void;
}

const SurveyForm: React.FC<Props> = ({
  className,
  survey,
  onSubmit,
  onSubmitComplete,
  children,
}) => {
  const handleSubmit = (values: any) => {
    let responses: Response[] = [];

    if (values.questions) {
      for (let n = 0; n < values.questions.length; ++n) {
        const value = values.questions[n];
        if (!value) {
          continue;
        }

        const question = survey.questions[n];
        switch (question.type) {
          case 'checkbox':
            for (const v of value as string[]) {
              responses.push({
                id: '',
                questionId: question.id,
                value: v,
              });
            }
            break;

          default:
            responses.push({
              id: '',
              questionId: question.id,
              value: String(value),
            });
            break;
        }
      }
    }

    let submission: Submission = {
      id: '',
      surveyId: '',
      date: '',
      responses: responses,
    };

    if (onSubmit) {
      onSubmit();
    }

    fetch(`${SERVER_URL}/surveys/${survey.id}/submissions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(submission),
    })
      .then((res) => res.json())
      .then((json) => {
        if (onSubmitComplete) {
          onSubmitComplete(json);
        }
      });
  };

  return (
    <div className={className}>
      <Form
        onSubmit={handleSubmit}
        render={(renderProps) => (
          <StyledForm onSubmit={renderProps.handleSubmit}>
            <SurveyTitle
              title={survey.name}
              subtitle={survey.subtitle}
            ></SurveyTitle>

            {survey.questions.map((q, index) => (
              <StyledQuestionCard
                key={q.id}
                title={q.title}
                subtitle={q.subtitle}
                required={q.required || false}
              >
                <Field name={`questions[${index}]`}>
                  {(props) => (
                    <QuestionContent
                      question={q}
                      onChange={(value) =>
                        props.input.onChange({ target: { value: value } })
                      }
                    ></QuestionContent>
                  )}
                </Field>
              </StyledQuestionCard>
            ))}

            {children}
          </StyledForm>
        )}
      ></Form>
    </div>
  );
};

const StyledForm = styled.form`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  padding-top: 0px;
`;

const StyledQuestionCard = styled(QuestionCard)`
  margin-top: 25px;
  margin-bottom: 25px;
`;

export default styled(SurveyForm)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
