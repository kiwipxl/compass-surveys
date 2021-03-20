import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Survey, Response } from '@compass-surveys/common';
import { SERVER_URL } from '../config';
import SurveyForm from '../components/SurveyForm';

interface Props {
  className?: string;
}

const SurveyFormPage: React.FC<Props> = ({ className }) => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = React.useState<Survey>();

  React.useEffect(() => {
    fetch(`${SERVER_URL}/surveys/${surveyId}`)
      .then((res) => res.json())
      .then((obj) => {
        setSurvey(obj);
      });
  }, []);

  return (
    <div className={className}>
      {!survey && <div>Loading...</div>}

      {survey && <SurveyForm survey={survey}></SurveyForm>}
    </div>
  );
};

export default styled(SurveyFormPage)`
  width: 100%;
`;
