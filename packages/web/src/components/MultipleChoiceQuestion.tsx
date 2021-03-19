import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MultipleChoiceQuestion } from '@compass-surveys/common';

interface Props {
  question: MultipleChoiceQuestion;
}

const MultipleChoiceQuestionComponent: React.FC<Props> = ({ question }) => {
  const [value, setValue] = React.useState('');

  if (question.choices.length === 0) {
    return <div>No choices given!</div>;
  }

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  return (
    <RadioGroup value={value} onChange={handleChange}>
      {question.choices.map((choice) => (
        <FormControlLabel
          key={choice}
          value={choice}
          label={choice}
          control={<Radio></Radio>}
        ></FormControlLabel>
      ))}
    </RadioGroup>
  );
};

export default MultipleChoiceQuestionComponent;
