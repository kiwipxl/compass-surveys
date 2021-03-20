import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { ShortAnswerQuestion } from '@compass-surveys/common';

interface Props {
  className?: string;
  question: ShortAnswerQuestion;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const ShortAnswerQuestionComponent: React.FC<Props> = ({
  className,
  question,
  disabled,
  defaultValue,
  onChange,
}) => {
  return (
    <TextField
      className={className}
      disabled={disabled}
      placeholder="Your Answer"
      defaultValue={defaultValue}
      onChange={(ev) => onChange && onChange(ev.target.value)}
    ></TextField>
  );
};

export default styled(ShortAnswerQuestionComponent)`
  width: 100%;
`;
