import React from 'react';
import styled from 'styled-components';
import { Survey, Question, Response } from '@compass-surveys/common';
import QuestionCard from './questions/QuestionCard';
import QuestionContent from './questions/QuestionContent';

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
      <Container>
        {survey.questions.map((q, index) => (
          <StyledQuestionCard
            key={q.id}
            title={q.title}
            subtitle={q.subtitle}
            required={q.required || false}
          >
            <QuestionContent
              question={q}
              defaultValue={getResponseDefaultValue(q)}
            ></QuestionContent>
          </StyledQuestionCard>
        ))}

        <input type="submit"></input>
      </Container>
    </div>
  );
};

const Container = styled.div`
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
