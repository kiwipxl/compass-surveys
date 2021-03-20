import React from 'react';
import styled from 'styled-components';
import { Field } from 'react-final-form';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Question } from '@compass-surveys/common';
import QuestionVariant from './QuestionVariant';

interface Props {
  className?: string;
  name?: string;
  title: string;
  subtitle?: string;
  required: boolean;
  question: Question;
  defaultValue?: any;
}

const QuestionCard: React.FC<Props> = ({
  className,
  name,
  title,
  subtitle,
  required,
  question,
  defaultValue,
  children,
}) => {
  return (
    <Card className={className} variant="outlined">
      <CardContent>
        <Typography variant="h6">{title}</Typography>

        {subtitle && <Typography color="textSecondary">{subtitle}</Typography>}

        <QuestionContainer>
          <Field name={name || ''}>
            {(props) => (
              <QuestionVariant
                question={question}
                defaultValue={defaultValue}
                onChange={(value) =>
                  props.input.onChange({ target: { value: value } })
                }
              ></QuestionVariant>
            )}
          </Field>
        </QuestionContainer>

        {children}
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
