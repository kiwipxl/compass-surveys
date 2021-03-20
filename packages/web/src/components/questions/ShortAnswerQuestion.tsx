import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { ShortAnswerQuestion } from '@compass-surveys/common';

interface Props {
  className?: string;
  question: ShortAnswerQuestion;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const ShortAnswerQuestionComponent: React.FC<Props> = ({
  className,
  question,
  defaultValue,
  onChange,
}) => {
  return (
    <TextField
      className={className}
      placeholder="Your Answer"
      defaultValue={defaultValue}
      onChange={(ev) => onChange(ev.target.value)}
    ></TextField>
  );
};

export default styled(ShortAnswerQuestionComponent)`
  width: 100%;
`;
