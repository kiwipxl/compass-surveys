import React from 'react';
import { Question } from '@compass-surveys/common';
import ShortAnswerQuestion from './ShortAnswerQuestion';
import ParagraphQuestion from './ParagraphQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import DropdownQuestion from './DropdownQuestion';
import LinearScaleQuestion from './LinearScaleQuestion';

interface Props {
  className?: string;
  question: Question;
  disabled?: boolean;
  defaultValue?: any;
  onChange?: (value: any) => void;
}

type QuestionContentComponent =
  | typeof ShortAnswerQuestion
  | typeof ParagraphQuestion
  | typeof MultipleChoiceQuestion
  | typeof CheckboxQuestion
  | typeof DropdownQuestion
  | typeof LinearScaleQuestion;

const QuestionContent: React.FC<Props> = ({
  className,
  question,
  disabled,
  defaultValue,
  onChange,
}) => {
  let componentType: QuestionContentComponent;

  switch (question.type) {
    case 'short_answer':
      componentType = ShortAnswerQuestion;
      break;

    case 'paragraph':
      componentType = ParagraphQuestion;
      break;

    case 'multiple_choice':
      componentType = MultipleChoiceQuestion;
      break;

    case 'checkbox':
      componentType = CheckboxQuestion;
      break;

    case 'dropdown':
      componentType = DropdownQuestion;
      break;

    case 'linear_scale':
      componentType = LinearScaleQuestion;
      break;

    default:
      return <div>Invalid question type {question.type}</div>;
  }

  return React.createElement(componentType as string, {
    className,
    question,
    disabled,
    defaultValue,
    onChange,
  });
};

export default QuestionContent;
