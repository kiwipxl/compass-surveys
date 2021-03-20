import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface Props {
  className?: string;
  title: string;
  subtitle?: string;
}

const SurveyTitle: React.FC<Props> = ({
  className,
  title,
  subtitle,
  children,
}) => {
  return (
    <Card className={className} variant="elevation" elevation={1}>
      <CardContent>
        <Typography variant="h4">{title}</Typography>

        {subtitle && <Typography color="textSecondary">{subtitle}</Typography>}

        {children}
      </CardContent>
    </Card>
  );
};

export default styled(SurveyTitle)`
  border-radius: 20px 20px 5px 5px !important;
`;
