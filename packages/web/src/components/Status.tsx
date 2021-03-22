import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';

/*
  A status is a simple alert that gives some information on what's currently happening
  to the user - like we're loading data.
*/

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
