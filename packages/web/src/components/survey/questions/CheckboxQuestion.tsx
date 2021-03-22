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

  // Array of all options to select by default
  defaultValue?: string[];

  // Invoked whenever any option has changed. Provides an array of all selected options.
  onChange?: (values: string[]) => void;
}

const CheckboxQuestionComponent: React.FC<Props> = ({
  className,
  question,
  disabled,
  defaultValue,
  onChange,
}) => {
  // If the defaultValue given has an option doesn't match one of the
  // question's choices, then it'll be put into the "Other: " textfield option.
  let defaultOtherText = '';
  if (question.otherChoice && defaultValue) {
    defaultOtherText =
      defaultValue.find((value) => !question.choices.includes(value)) || '';
  }

  // Array of all the options currently checked/selected.
  const [checked, setChecked] = React.useState<string[]>(defaultValue || []);

  // If the 'Other' checkbox is checked/selected
  const [otherChecked, setOtherChecked] = React.useState(
    defaultOtherText.length > 0,
  );
  // The textfield of the 'Other' checkbox
  const [otherText, setOtherText] = React.useState(defaultOtherText);

  if (question.choices.length === 0) {
    return <div>No choices given!</div>;
  }

  const handleCheckChange = (choice: string, isChecked: boolean) => {
    let newChecked = ([] as string[]).concat(checked);

    // If this choice is checked, then ensure it's now in the array.
    // If the choice is not checked, ensure it's now not in the array.

    if (newChecked.includes(choice)) {
      if (!isChecked) {
        newChecked.splice(newChecked.indexOf(choice), 1);
      }
    } else {
      if (isChecked) {
        // Makes sure we don't get duplicate 'Other' values
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
