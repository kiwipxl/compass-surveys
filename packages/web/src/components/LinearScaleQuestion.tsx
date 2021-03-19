import React from 'react';
import Slider from '@material-ui/core/Slider';
import { LinearScaleQuestion } from '@compass-surveys/common';

interface Props {
  question: LinearScaleQuestion;
}

const LinearScaleQuestionComponent: React.FC<Props> = ({ question }) => {
  const [value, setValue] = React.useState(question.default || question.min);

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
      value={value}
      step={question.step || 1}
      marks={marks}
      min={question.min}
      max={question.max}
      valueLabelDisplay="auto"
      onChange={(ev, newValue) => setValue(newValue as number)}
    ></Slider>
  );
};

export default LinearScaleQuestionComponent;
