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
  defaultValue?: any;
  onChange?: (value: any) => void;
}

const QuestionContent: React.FC<Props> = ({
  className,
  question,
  defaultValue,
  onChange,
}) => {
  switch (question.type) {
    case 'short_answer':
      return (
        <ShortAnswerQuestion
          className={className}
          question={question}
          defaultValue={defaultValue}
          onChange={onChange}
        ></ShortAnswerQuestion>
      );

    case 'paragraph':
      return (
        <ParagraphQuestion
          className={className}
          question={question}
          defaultValue={defaultValue}
          onChange={onChange}
        ></ParagraphQuestion>
      );

    case 'multiple_choice':
      return (
        <MultipleChoiceQuestion
          className={className}
          question={question}
          defaultValue={defaultValue}
          onChange={onChange}
        ></MultipleChoiceQuestion>
      );

    case 'checkbox':
      return (
        <CheckboxQuestion
          className={className}
          question={question}
          defaultValue={defaultValue}
          onChange={onChange}
        ></CheckboxQuestion>
      );

    case 'dropdown':
      return (
        <DropdownQuestion
          className={className}
          question={question}
          defaultValue={defaultValue}
          onChange={onChange}
        ></DropdownQuestion>
      );

    case 'linear_scale':
      return (
        <LinearScaleQuestion
          className={className}
          question={question}
          defaultValue={defaultValue}
          onChange={onChange}
        ></LinearScaleQuestion>
      );
  }

  return <div>Invalid question type {question.type}</div>;
};

export default QuestionContent;
