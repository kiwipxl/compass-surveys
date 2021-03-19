import React from 'react';
import styled from 'styled-components';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { MultipleChoiceQuestion } from '@compass-surveys/common';
import OtherTextField from './OtherTextField';

interface Props {
  question: MultipleChoiceQuestion;
}

const MultipleChoiceQuestionComponent: React.FC<Props> = ({ question }) => {
  const [value, setValue] = React.useState('');
  const [otherText, setOtherText] = React.useState('');

  if (question.choices.length === 0) {
    return <div>No choices given!</div>;
  }

  return (
    <RadioGroup value={value} onChange={(ev) => setValue(ev.target.value)}>
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
              onChange={(text) => {
                setOtherText(text);
                setValue('Other');
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
