import React from 'react';
import { Question } from '@compass-surveys/common';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';

interface Props {
  question: Question;
}

const QuestionVariant: React.FC<Props> = ({ question }) => {
  switch (question.type) {
    case 'multiple_choice':
      return (
        <MultipleChoiceQuestion question={question}></MultipleChoiceQuestion>
      );
  }

  return <div>Invalid question type {question.type}</div>;
};

export default QuestionVariant;
