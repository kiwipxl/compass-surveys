import React from 'react';
import styled from 'styled-components';
import { Form, useForm } from 'react-final-form';
import { Survey, Question, Response } from '@compass-surveys/common';
import QuestionCard from './questions/QuestionCard';

interface Props {
  className?: string;
  survey: Survey;
  responses: Response[];
}

const ReadOnlySurveyForm: React.FC<Props> = ({
  className,
  survey,
  responses,
}) => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  const getResponseDefaultValue = (question: Question) => {
    const values = responses
      .filter((r) => r.questionId === question.id)
      .map((r) => r.value);

    switch (question.type) {
      case 'short_answer':
        return values.length > 0 ? values[0] : undefined;

      case 'paragraph':
        return values.length > 0 ? values[0] : undefined;

      case 'multiple_choice':
        return values.length > 0 ? values[0] : undefined;

      case 'checkbox':
        return values;

      case 'dropdown':
        return values.length > 0 ? values[0] : undefined;

      case 'linear_scale':
        return values.length > 0 ? values[0] : undefined;
    }

    return undefined;
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
                namePrefix={`questions[${index}]`}
                title={q.title}
                subtitle={q.subtitle}
                required={q.required || false}
                question={q}
                defaultValue={getResponseDefaultValue(q)}
              ></StyledQuestionCard>
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

export default styled(ReadOnlySurveyForm)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
