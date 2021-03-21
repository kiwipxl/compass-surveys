import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

/* Displays actions (such as a back button) on statuses like errors and info */

interface Props {
  className?: string;
}

const StatusActions: React.FC<Props> = ({ className }) => {
  const routerHistory = useHistory();

  return (
    <div className={className}>
      <BackButton
        color="secondary"
        variant="contained"
        onClick={() => routerHistory.goBack()}
      >
        Back
      </BackButton>
    </div>
  );
};

const BackButton = styled(Button)`
  width: 100%;
`;

export default styled(StatusActions)`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
