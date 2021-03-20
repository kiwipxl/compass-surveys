import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { ParagraphQuestion } from '@compass-surveys/common';

interface Props {
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  question: ParagraphQuestion;
  onChange?: (value: string) => void;
}

const ParagraphQuestionComponent: React.FC<Props> = ({
  className,
  defaultValue,
  disabled,
  question,
  onChange,
}) => {
  return (
    <TextField
      className={className}
      defaultValue={defaultValue}
      placeholder="Your Answer"
      disabled={disabled}
      multiline
      onChange={(ev) => onChange && onChange(ev.target.value)}
    ></TextField>
  );
};

export default styled(ParagraphQuestionComponent)`
  width: 100%;
  height: 100%;
`;
