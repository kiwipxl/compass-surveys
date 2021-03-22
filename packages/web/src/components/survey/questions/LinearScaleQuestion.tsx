import React from 'react';
import Slider from '@material-ui/core/Slider';
import { LinearScaleQuestion } from '@compass-surveys/common';

interface Props {
  className?: string;
  question: LinearScaleQuestion;
  disabled?: boolean;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const LinearScaleQuestionComponent: React.FC<Props> = ({
  className,
  question,
  disabled,
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = React.useState(
    defaultValue || question.default || question.min,
  );

  // See the following link for Slider documentation and how we're using it here.
  // https://material-ui.com/components/slider/
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
      disabled={disabled}
      value={value}
      step={question.step || 1}
      marks={marks}
      min={question.min}
      max={question.max}
      valueLabelDisplay="auto"
      onChange={(ev, newValue) => {
        setValue(newValue as number);
        if (onChange) {
          onChange(newValue as number);
        }
      }}
    ></Slider>
  );
};

export default LinearScaleQuestionComponent;
