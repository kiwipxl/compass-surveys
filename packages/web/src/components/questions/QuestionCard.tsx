import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface Props {
  className?: string;
  title: string;
  subtitle?: string;
  required: boolean;
}

const QuestionCard: React.FC<Props> = ({
  className,
  title,
  subtitle,
  required,
  children,
}) => {
  return (
    <Card className={className} variant="outlined">
      <CardContent>
        <Typography variant="h6">{title}</Typography>

        {subtitle && <Typography color="textSecondary">{subtitle}</Typography>}

        <QuestionContainer>{children}</QuestionContainer>
      </CardContent>
    </Card>
  );
};

const QuestionContainer = styled.div`
  margin-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
`;

export default styled(QuestionCard)``;
