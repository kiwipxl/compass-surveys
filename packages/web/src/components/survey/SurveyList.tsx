import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Survey } from '@compass-surveys/common';
import SurveyListItem from './SurveyListItem';

interface Props {
  className?: string;
  surveys: Survey[];
}

const SurveyList: React.FC<Props> = ({ className, surveys }) => {
  return (
    <div className={className}>
      <Grid container spacing={4}>
        {surveys.map((survey) => (
          <Grid key={survey.id} item xs={6}>
            <SurveyListItem
              id={survey.id}
              name={survey.name}
              subtitle={survey.subtitle}
            ></SurveyListItem>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default styled(SurveyList)``;
