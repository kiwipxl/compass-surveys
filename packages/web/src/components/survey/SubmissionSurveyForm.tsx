import React from 'react';
import styled from 'styled-components';
import { Survey, Question, Response } from '@compass-surveys/common';
import QuestionCard from './questions/QuestionCard';
import QuestionContent from './questions/QuestionContent';
import SurveyTitle from './SurveyTitle';

/*
  The survey form that's used to render submission responses.

  All fields are disabled here.
*/

interface Props {
  className?: string;
  survey: Survey;
  responses: Response[];
}

const SubmissionSurveyForm: React.FC<Props> = ({
  className,
  survey,
  responses,
  children,
}) => {
  // Finds all responses and aggregates their values for a given question.
  // This is used as a default value to display.
  // It won't be able to be modified as each field is disabled/read-only.
  const getResponseDefaultValue = (question: Question) => {
    const values = responses
      .filter((r) => r.questionId === question.id)
      .map((r) => r.value);

    switch (question.type) {
      case 'short_answer':
        return values.length > 0 ? (values[0] as string) : undefined;

      case 'paragraph':
        return values.length > 0 ? (values[0] as string) : undefined;

      case 'multiple_choice':
        return values.length > 0 ? (values[0] as string) : undefined;

      case 'checkbox':
        return values as string[];

      case 'dropdown':
        return values.length > 0 ? (values[0] as string) : undefined;

      case 'linear_scale':
        return values.length > 0 ? Number(values[0]) : undefined;
    }

    return undefined;
  };

  return (
    <div className={className}>
      <SurveyTitle title={survey.name} subtitle={survey.subtitle}></SurveyTitle>

      {/* Render every question */}
      {survey.questions.map((q, index) => (
        <StyledQuestionCard
          key={q.id}
          title={q.title}
          subtitle={q.subtitle}
          required={q.required || false}
        >
          <QuestionContent
            question={q}
            disabled
            defaultValue={getResponseDefaultValue(q)}
          ></QuestionContent>
        </StyledQuestionCard>
      ))}

      {children}
    </div>
  );
};

const StyledQuestionCard = styled(QuestionCard)`
  margin-top: 25px;
  margin-bottom: 25px;
`;

export default styled(SubmissionSurveyForm)``;
