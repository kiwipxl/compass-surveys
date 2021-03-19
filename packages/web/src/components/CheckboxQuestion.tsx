import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { CheckboxQuestion } from '@compass-surveys/common';

interface Props {
  question: CheckboxQuestion;
}

const CheckboxQuestionComponent: React.FC<Props> = ({ question }) => {
  const [checked, setChecked] = React.useState<boolean[]>([]);

  if (question.choices.length === 0) {
    return <div>No choices given!</div>;
  }

  const handleChange = (ev: any, isChecked: boolean, index: number) => {
    const newChecked = ([] as boolean[]).concat(checked);
    newChecked[index] = isChecked;
    setChecked(newChecked);
  };

  return (
    <FormGroup>
      {question.choices.map((choice, index) => (
        <FormControlLabel
          key={choice}
          value={choice}
          label={choice}
          checked={checked[index]}
          control={<Checkbox></Checkbox>}
          onChange={() => handleChange.bind(index)}
        ></FormControlLabel>
      ))}
    </FormGroup>
  );
};

export default CheckboxQuestionComponent;
