import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  className?: string;
  message: string;
}

const Status: React.FC<Props> = ({ className, message }) => {
  return (
    <div className={className}>
      <Typography variant="h5">{message}</Typography>
      <StyledCircularProgress></StyledCircularProgress>
    </div>
  );
};

const StyledCircularProgress = styled(CircularProgress)`
  margin-left: 50px;
`;

export default styled(Status)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
