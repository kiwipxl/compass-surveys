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
  disabled?: boolean;
  onSubmitStateChange?: (state: SubmitState) => void;
}

export interface SubmitState {
  submitting: boolean;
  submission?: Submission;
  error?: Error;
}

const SurveyForm: React.FC<Props> = ({
  className,
  survey,
  disabled,
  onSubmitStateChange,
  children,
}) => {
  const [submitState, setSubmitState] = React.useState<SubmitState>({
    submitting: false,
  });

  React.useEffect(() => {
    if (onSubmitStateChange) {
      onSubmitStateChange(submitState);
    }
  }, [submitState]);

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

    setSubmitState({
      submitting: true,
      submission: undefined,
      error: undefined,
    });

    fetch(`${SERVER_URL}/surveys/${survey.id}/submissions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(submission),
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmitState({
          submitting: false,
          submission: res,
          error: undefined,
        });
      })
      .catch((err) => {
        setSubmitState({
          submitting: false,
          submission: undefined,
          error: err,
        });
      });
  };

  return (
    <div className={className}>
      <Form
        name="test"
        onSubmit={handleSubmit}
        render={(renderProps) => (
          <form onSubmit={renderProps.handleSubmit}>
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
                      disabled={disabled}
                      onChange={(value) =>
                        props.input.onChange({ target: { value: value } })
                      }
                    ></QuestionContent>
                  )}
                </Field>
              </StyledQuestionCard>
            ))}

            {children}
          </form>
        )}
      ></Form>
    </div>
  );
};

const StyledQuestionCard = styled(QuestionCard)`
  margin-top: 25px;
  margin-bottom: 25px;
`;

export default styled(SurveyForm)``;
