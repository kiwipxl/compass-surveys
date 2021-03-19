import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { ParagraphQuestion } from '@compass-surveys/common';

interface Props {
  className?: string;
  question: ParagraphQuestion;
}

const ParagraphQuestionComponent: React.FC<Props> = ({
  className,
  question,
}) => {
  const [value, setValue] = React.useState('');

  return (
    <TextField
      className={className}
      value={value}
      placeholder="Your Answer"
      multiline
      onChange={(ev) => setValue(ev.target.value)}
    ></TextField>
  );
};

export default styled(ParagraphQuestionComponent)`
  width: 100%;
  height: 100%;
`;
