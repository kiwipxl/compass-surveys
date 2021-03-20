import React from 'react';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Field } from 'react-final-form';
import { DropdownQuestion } from '@compass-surveys/common';

interface Props {
  className?: string;
  question: DropdownQuestion;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const DropdownQuestionComponent: React.FC<Props> = ({
  className,
  question,
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = React.useState(defaultValue || '');

  return (
    <FormControl className={className} variant="outlined">
      <Select
        displayEmpty
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value as string);
          onChange(ev.target.value as string);
        }}
      >
        <MenuItem key="" value="" disabled>
          Choose
        </MenuItem>

        {question.choices.map((choice) => (
          <MenuItem key={choice} value={choice}>
            {choice}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default styled(DropdownQuestionComponent)`
  width: 200px;
`;
