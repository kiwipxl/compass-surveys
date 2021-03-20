import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import { Survey, Submission, Response } from '@compass-surveys/common';
import QuestionCard from './questions/QuestionCard';
import QuestionContent from './questions/QuestionContent';
import { SERVER_URL } from '../config';

interface Props {
  className?: string;
  survey: Survey;
}

const SurveyForm: React.FC<Props> = ({ className, survey }) => {
  const onSubmit = (values: any) => {
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

    fetch(`${SERVER_URL}/surveys/${survey.id}/submissions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(submission),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  return (
    <div className={className}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <StyledForm onSubmit={handleSubmit}>
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

            <input type="submit"></input>
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
