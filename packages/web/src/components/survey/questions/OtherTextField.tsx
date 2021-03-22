import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

/*
  This component is used for checkboxes and multiple choice "Other: " options.
  It's componentised here to prevent DRY.
*/

interface Props extends React.ComponentPropsWithoutRef<typeof TextField> {}

const OtherTextField: React.FC<Props> = ({ ...props }) => {
  return (
    <Container>
      <Typography>Other: </Typography>
      <StyledTextField {...props}></StyledTextField>
    </Container>
  );
};

const Container = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  margin-left: 20px !important;
  flex: 1;
`;

export default OtherTextField;
