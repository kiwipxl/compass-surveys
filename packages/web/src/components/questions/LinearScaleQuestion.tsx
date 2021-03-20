import React from 'react';
import Slider from '@material-ui/core/Slider';
import { Field } from 'react-final-form';
import { LinearScaleQuestion } from '@compass-surveys/common';

interface Props {
  className?: string;
  question: LinearScaleQuestion;
  defaultValue?: number;
  onChange: (value: number) => void;
}

const LinearScaleQuestionComponent: React.FC<Props> = ({
  className,
  question,
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = React.useState(
    defaultValue || question.default || question.min,
  );

  const marks = [
    {
      value: question.min,
      label: question.min,
    },
    {
      value: question.max,
      label: question.max,
    },
  ];

  return (
    <Slider
      className={className}
      value={value}
      step={question.step || 1}
      marks={marks}
      min={question.min}
      max={question.max}
      valueLabelDisplay="auto"
      onChange={(ev, newValue) => {
        setValue(newValue as number);
        onChange(newValue as number);
      }}
    ></Slider>
  );
};

export default LinearScaleQuestionComponent;
