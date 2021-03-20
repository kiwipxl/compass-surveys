import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-final-form';
import { Survey } from '@compass-surveys/common';
import QuestionCard from './questions/QuestionCard';

interface Props {
  className?: string;
  survey: Survey;
}

const SurveyForm: React.FC<Props> = ({ className, survey }) => {
  const onSubmit = (values: any) => {
    console.log(values);
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

export default styled(SurveyForm)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
