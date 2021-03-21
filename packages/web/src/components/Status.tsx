import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';

interface Props {
  className?: string;
  title?: string;
  message: string;
  loading?: boolean;
}

const Status: React.FC<Props> = ({
  className,
  title,
  message,
  loading,
  children,
}) => {
  return (
    <div className={className}>
      <Alert
        variant="outlined"
        severity="info"
        action={loading && <CircularProgress></CircularProgress>}
      >
        <AlertTitle>{title}</AlertTitle>

        {message}

        {children}
      </Alert>
    </div>
  );
};

export default styled(Status)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
