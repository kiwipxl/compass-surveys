import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

interface Props {
  className?: string;
  title: string;
}

const SurveyFormSubmitted: React.FC<Props> = ({ className, title }) => {
  const routerHistory = useHistory();

  return (
    <div className={className}>
      <StyledCard variant="elevation">
        <CardContent>
          <Typography variant="h4">{title}</Typography>

          <Typography component="p">Your survey has been submitted.</Typography>
        </CardContent>

        <CardActions>
          <HomeButton
            color="primary"
            variant="contained"
            onClick={() => routerHistory.push('/')}
          >
            Home
          </HomeButton>
        </CardActions>
      </StyledCard>
    </div>
  );
};

const HomeButton = styled(Button)`
  width: 100%;
`;

const StyledCard = styled(Card)`
  padding: 20px;
`;

export default styled(SurveyFormSubmitted)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
