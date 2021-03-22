import React from 'react';
import { Question } from '@compass-surveys/common';
import ShortAnswerQuestion from './ShortAnswerQuestion';
import ParagraphQuestion from './ParagraphQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import CheckboxQuestion from './CheckboxQuestion';
import DropdownQuestion from './DropdownQuestion';
import LinearScaleQuestion from './LinearScaleQuestion';

/*
  Renders a Question component based on it's type.
*/

interface Props {
  className?: string;
  question: Question;
  disabled?: boolean;
  defaultValue?: any;

  // Invoked whenever any value has changed.
  // This lets us move data from bottom-up so we can submit form data (for example).
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

  // We can't use JSX tags because the type is dynamic, so we do this.
  return React.createElement(componentType as string, {
    className,
    question,
    disabled,
    defaultValue,
    onChange,
  });
};

export default QuestionContent;
