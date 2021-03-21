import React from 'react';
import styled from 'styled-components';
import { Alert, AlertTitle } from '@material-ui/lab';

interface Props {
  className?: string;
  title?: string;
  message: string;
}

const ErrorStatus: React.FC<Props> = ({ className, title, message }) => {
  return (
    <div className={className}>
      <StyledAlert severity="error">
        <AlertTitle>{title || 'Error'}</AlertTitle>

        {message}
      </StyledAlert>
    </div>
  );
};

const StyledAlert = styled(Alert)`
  width: 50%;
`;

export default styled(ErrorStatus)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
