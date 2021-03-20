import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Survey, Submission } from '@compass-surveys/common';
import { SERVER_URL } from '../config';
import ReadOnlySurveyForm from '../components/ReadOnlySurveyForm';

interface Props {
  className?: string;
}

const SurveySubmissionsPage: React.FC<Props> = ({ className }) => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = React.useState<Survey>();
  const [submissions, setSubmissions] = React.useState<Submission[]>();
  const [submissionIndex, setSubmissionIndex] = React.useState(0);

  React.useEffect(() => {
    fetch(`${SERVER_URL}/surveys/${surveyId}`)
      .then((res) => res.json())
      .then((obj) => {
        setSurvey(obj);
      });

    fetch(`${SERVER_URL}/surveys/${surveyId}/submissions`)
      .then((res) => res.json())
      .then((obj) => {
        setSubmissions(obj);
      });
  }, []);

  return (
    <div className={className}>
      {!survey && <div>Loading...</div>}

      {survey && submissions && (
        <div>
          {submissions.length > 0 && (
            <ReadOnlySurveyForm
              survey={survey}
              responses={submissions[submissionIndex].responses}
            ></ReadOnlySurveyForm>
          )}
        </div>
      )}
    </div>
  );
};

export default styled(SurveySubmissionsPage)`
  width: 100%;
`;
