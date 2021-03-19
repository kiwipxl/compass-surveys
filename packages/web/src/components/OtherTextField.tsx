import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

interface Props {
  onChange?: (value: string) => void;
}

const OtherTextField: React.FC<Props> = (props) => {
  const { onChange } = props;

  const [value, setValue] = React.useState('');

  return (
    <Container>
      <Typography>Other: </Typography>
      <StyledTextField
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);

          if (onChange) {
            onChange(ev.target.value);
          }
        }}
      ></StyledTextField>
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
