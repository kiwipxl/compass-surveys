import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Question } from '@compass-surveys/common';
import QuestionVariant from './QuestionVariant';

interface Props {
  className?: string;
  title: string;
  subtitle?: string;
  required: boolean;
  question: Question;
}

const QuestionCard: React.FC<Props> = ({
  className,
  title,
  subtitle,
  required,
  question,
  children,
}) => {
  return (
    <Card className={className} variant="outlined">
      <CardContent>
        <Typography variant="h6">{title}</Typography>

        {subtitle && <Typography color="textSecondary">{subtitle}</Typography>}

        <QuestionVariant question={question}></QuestionVariant>

        {children}
      </CardContent>
    </Card>
  );
};

export default styled(QuestionCard)``;
