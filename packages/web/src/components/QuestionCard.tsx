import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

type IProps = {
  title: string;
  subtitle?: string;
};

const QuestionCard: React.FC<IProps> = ({ title, subtitle }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>

        {subtitle && <Typography color="textSecondary">{subtitle}</Typography>}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
