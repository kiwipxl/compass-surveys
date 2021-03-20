import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { ParagraphQuestion } from '@compass-surveys/common';

interface Props {
  className?: string;
  defaultValue?: string;
  question: ParagraphQuestion;
  onChange?: (value: string) => void;
}

const ParagraphQuestionComponent: React.FC<Props> = ({
  className,
  defaultValue,
  question,
  onChange,
}) => {
  return (
    <TextField
      className={className}
      defaultValue={defaultValue}
      placeholder="Your Answer"
      multiline
      onChange={(ev) => onChange && onChange(ev.target.value)}
    ></TextField>
  );
};

export default styled(ParagraphQuestionComponent)`
  width: 100%;
  height: 100%;
`;
