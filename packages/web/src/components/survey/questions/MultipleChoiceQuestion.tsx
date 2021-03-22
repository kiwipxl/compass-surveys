import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MultipleChoiceQuestion } from '@compass-surveys/common';
import OtherTextField from './OtherTextField';

interface Props {
  className?: string;
  question: MultipleChoiceQuestion;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const MultipleChoiceQuestionComponent: React.FC<Props> = ({
  className,
  question,
  disabled,
  defaultValue,
  onChange,
}) => {
  let defaultOtherText = '';

  // Sets the default text to display for the "Other" textfield.
  // We only do this if it's enabled & our default value is an
  // option value (option that isn't included in question options).
  if (question.otherChoice && defaultValue) {
    if (!question.choices.includes(defaultValue)) {
      defaultOtherText = defaultValue;
      defaultValue = 'Other';
    }
  }

  const [value, setValue] = React.useState(defaultValue || '');
  // The textfield of the 'Other' option
  const [otherText, setOtherText] = React.useState(defaultOtherText || '');

  if (question.choices.length === 0) {
    return <div>No choices given!</div>;
  }

  return (
    <RadioGroup
      className={className}
      value={value}
      onChange={(ev, newValue) => {
        setValue(newValue);
        if (onChange) {
          onChange(newValue === 'Other' ? otherText : newValue);
        }
      }}
    >
      {question.choices.map((choice) => (
        <FormControlLabel
          key={choice}
          disabled={disabled}
          value={choice}
          label={choice}
          control={<Radio></Radio>}
        ></FormControlLabel>
      ))}

      {/* Render "Other: " option if it's enabled */}
      {question.otherChoice && (
        <FormControlLabel
          key="Other"
          value="Other"
          disabled={disabled}
          label={
            <OtherTextField
              value={otherText}
              disabled={disabled}
              onChange={(ev) => {
                setValue('Other');
                setOtherText(ev.target.value);
                if (onChange) {
                  onChange(ev.target.value);
                }
              }}
            ></OtherTextField>
          }
          control={<Radio></Radio>}
        ></FormControlLabel>
      )}
    </RadioGroup>
  );
};

export default MultipleChoiceQuestionComponent;
