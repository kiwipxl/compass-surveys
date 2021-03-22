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

  // Subscribe to submit state changes (whether we're now submitting, or we've submitted, etc).
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

  React.useEffect(
    () => onSubmitStateChange && onSubmitStateChange(submitState),
    [submitState, onSubmitStateChange],
  );

  // Invoked when we click the form submit button.
  // The values here contain all of our form data/state provided
  // by react-final-form.
  const handleSubmit = (values: any) => {
    // Convert all of our values into Responses.
    // This denormalises our data into key-value pairs. This is how
    // our server likes our data structured.
    let responses: Response[] = [];

    if (values.questions) {
      for (let n = 0; n < values.questions.length; ++n) {
        const value = values.questions[n];
        if (!value) {
          continue;
        }

        // Denormalize values into Response key-value pairs.
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

    // Post submission to survey
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

            {/* Render every question in the survey */}
            {survey.questions.map((q, index) => (
              <StyledQuestionCard
                key={q.id}
                title={q.title}
                subtitle={q.subtitle}
                required={q.required || false}
              >
                {/*
                  Render a react-final-form Field. We set the value of this field
                  with `props.input.onChange`, and the result is given to us on form submit.
                  This means we don't have to handle any global state stuff ourselves - it's
                  all done for us!

                  The name here identifies which question we're dealing with.

                  See here for more information:
                  https://final-form.org/docs/react-final-form/api/Field
                */}
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
