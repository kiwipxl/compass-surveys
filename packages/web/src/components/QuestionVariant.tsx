import React from 'react';
import { Question } from '@compass-surveys/common';
import ShortAnswerQuestion from './ShortAnswerQuestion';
import ParagraphQuestion from './ParagraphQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import DropdownQuestion from './DropdownQuestion';
import LinearScaleQuestion from './LinearScaleQuestion';

interface Props {
  question: Question;
}

const QuestionVariant: React.FC<Props> = ({ question }) => {
  switch (question.type) {
    case 'short_answer':
      return <ShortAnswerQuestion question={question}></ShortAnswerQuestion>;

    case 'paragraph':
      return <ParagraphQuestion question={question}></ParagraphQuestion>;

    case 'multiple_choice':
      return (
        <MultipleChoiceQuestion question={question}></MultipleChoiceQuestion>
      );

    case 'checkbox':
      return <CheckboxQuestion question={question}></CheckboxQuestion>;

    case 'dropdown':
      return <DropdownQuestion question={question}></DropdownQuestion>;

    case 'linear_scale':
      return <LinearScaleQuestion question={question}></LinearScaleQuestion>;
  }

  return <div>Invalid question type {question.type}</div>;
};

export default QuestionVariant;
