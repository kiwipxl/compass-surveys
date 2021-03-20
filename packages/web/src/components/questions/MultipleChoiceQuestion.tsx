import React from 'react';
import styled from 'styled-components';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MultipleChoiceQuestion } from '@compass-surveys/common';
import OtherTextField from './OtherTextField';

interface Props {
  className?: string;
  question: MultipleChoiceQuestion;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const MultipleChoiceQuestionComponent: React.FC<Props> = ({
  className,
  question,
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = React.useState(defaultValue || '');
  const [otherText, setOtherText] = React.useState('');

  if (question.choices.length === 0) {
    return <div>No choices given!</div>;
  }

  return (
    <RadioGroup
      className={className}
      value={value}
      onChange={(ev, newValue) => {
        setValue(newValue);
        if (newValue === 'Other') {
          onChange(otherText);
        } else {
          onChange(newValue);
        }
      }}
    >
      {question.choices.map((choice) => (
        <FormControlLabel
          key={choice}
          value={choice}
          label={choice}
          control={<Radio></Radio>}
        ></FormControlLabel>
      ))}

      {question.otherChoice && (
        <FormControlLabel
          key="Other"
          value="Other"
          label={
            <OtherTextField
              onChange={(ev) => {
                setValue('Other');
                setOtherText(ev.target.value);
                onChange(ev.target.value);
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
