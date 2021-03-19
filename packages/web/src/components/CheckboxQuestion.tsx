import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { CheckboxQuestion } from '@compass-surveys/common';
import OtherTextField from './OtherTextField';

interface Props {
  question: CheckboxQuestion;
}

const CheckboxQuestionComponent: React.FC<Props> = ({ question }) => {
  const defaultChecked = new Array(
    question.choices.length + (question.otherChoice ? 1 : 0),
  ).fill(false);
  const [checked, setChecked] = React.useState<boolean[]>(defaultChecked);
  const [otherText, setOtherText] = React.useState('');

  if (question.choices.length === 0) {
    return <div>No choices given!</div>;
  }

  const handleCheckChange = (index: number, isChecked: boolean) => {
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
          onChange={(ev, isChecked) => handleCheckChange(index, isChecked)}
        ></FormControlLabel>
      ))}

      {question.otherChoice && (
        <FormControlLabel
          value="Other"
          checked={checked[checked.length - 1]}
          label={
            <OtherTextField
              onChange={(text) => {
                setOtherText(text);
                handleCheckChange(checked.length - 1, text.length > 0);
              }}
            ></OtherTextField>
          }
          control={<Checkbox></Checkbox>}
          onChange={(ev, isChecked) =>
            handleCheckChange(checked.length - 1, isChecked)
          }
        ></FormControlLabel>
      )}
    </FormGroup>
  );
};

export default CheckboxQuestionComponent;
