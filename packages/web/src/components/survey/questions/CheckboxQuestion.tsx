import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { CheckboxQuestion } from '@compass-surveys/common';
import OtherTextField from './OtherTextField';

interface Props {
  className?: string;
  question: CheckboxQuestion;
  disabled?: boolean;
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
}

const CheckboxQuestionComponent: React.FC<Props> = ({
  className,
  question,
  disabled,
  defaultValue,
  onChange,
}) => {
  let defaultOtherText = '';
  if (question.otherChoice && defaultValue) {
    defaultOtherText =
      defaultValue.find((value) => !question.choices.includes(value)) || '';
  }

  const [checked, setChecked] = React.useState<string[]>(() => {
    if (defaultValue) {
      let checked = defaultValue;

      if (defaultOtherText) {
        checked.push(defaultOtherText);
      }

      return checked;
    }

    return [];
  });

  const [otherChecked, setOtherChecked] = React.useState(false);
  const [otherText, setOtherText] = React.useState(defaultOtherText);

  if (question.choices.length === 0) {
    return <div>No choices given!</div>;
  }

  const handleCheckChange = (choice: string, isChecked: boolean) => {
    let newChecked = ([] as string[]).concat(checked);

    if (newChecked.includes(choice)) {
      if (!isChecked) {
        newChecked.splice(newChecked.indexOf(choice), 1);
      }
    } else {
      if (isChecked) {
        if (!question.choices.includes(choice)) {
          newChecked = checked.filter((c) => question.choices.includes(c));
        }

        newChecked.push(choice);
      }
    }

    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <FormGroup className={className}>
      {question.choices.map((choice) => (
        <FormControlLabel
          key={choice}
          value={choice}
          label={choice}
          checked={checked.includes(choice)}
          disabled={disabled}
          control={<Checkbox></Checkbox>}
          onChange={(ev, isChecked) => handleCheckChange(choice, isChecked)}
        ></FormControlLabel>
      ))}

      {question.otherChoice && (
        <FormControlLabel
          value="Other"
          checked={otherChecked}
          disabled={disabled}
          label={
            <OtherTextField
              disabled={disabled}
              value={otherText}
              onChange={(ev) => {
                setOtherChecked(true);
                setOtherText(ev.target.value);
                handleCheckChange(ev.target.value, true);
              }}
            ></OtherTextField>
          }
          control={<Checkbox></Checkbox>}
          onChange={(ev, isChecked) => {
            setOtherChecked(isChecked);
            handleCheckChange(otherText, isChecked);
          }}
        ></FormControlLabel>
      )}
    </FormGroup>
  );
};

export default CheckboxQuestionComponent;
