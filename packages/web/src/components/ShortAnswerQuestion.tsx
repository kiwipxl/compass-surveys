import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { ShortAnswerQuestion } from '@compass-surveys/common';

interface Props {
  className?: string;
  question: ShortAnswerQuestion;
}

const ShortAnswerQuestionComponent: React.FC<Props> = ({
  className,
  question,
}) => {
  const [value, setValue] = React.useState('');

  return (
    <TextField
      className={className}
      value={value}
      placeholder="Your Answer"
      onChange={(ev) => setValue(ev.target.value)}
    ></TextField>
  );
};

export default styled(ShortAnswerQuestionComponent)`
  width: 100%;
`;
