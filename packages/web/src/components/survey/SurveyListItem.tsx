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
  id: string;
  name: string;
  subtitle?: string;
}

const SurveyListItem: React.FC<Props> = ({ className, id, name, subtitle }) => {
  const routerHistory = useHistory();

  return (
    <Card className={className} variant="outlined">
      <CardContent>
        <Typography variant="h6">{name}</Typography>

        {subtitle && <Typography color="textSecondary">{subtitle}</Typography>}
      </CardContent>

      <CardActions>
        <ActionsContainer>
          <Button
            variant="outlined"
            onClick={() => routerHistory.push(`/surveys/${id}/submissions`)}
          >
            Submissions
          </Button>

          <StartButton
            variant="contained"
            color="primary"
            onClick={() => routerHistory.push(`/surveys/${id}`)}
          >
            Start
          </StartButton>
        </ActionsContainer>
      </CardActions>
    </Card>
  );
};

const ActionsContainer = styled.div`
  margin-left: auto;
`;

const StartButton = styled(Button)`
  margin-left: 10px !important;
`;

export default styled(SurveyListItem)`
  transition: transform 0.1s !important;

  &:hover {
    transform: scale(1.1);
  }
`;
