import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useParams, useHistory } from 'react-router-dom';
import { Survey, Submission } from '@compass-surveys/common';
import { SERVER_URL } from '../config';
import ReadOnlySurveyForm from '../components/survey/ReadOnlySurveyForm';
import Status from '../components/Status';
import PaginationButtons from '../components/PaginationButtons';

interface Props {
  className?: string;
}

const SurveySubmissionsPage: React.FC<Props> = ({ className }) => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = React.useState<Survey>();
  const [submissions, setSubmissions] = React.useState<Submission[]>();
  const [submissionIndex, setSubmissionIndex] = React.useState(0);
  const routerHistory = useHistory();

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
  }, [surveyId]);

  return (
    <div className={className}>
      {!survey && <Status message="Loading..."></Status>}

      {submissions && submissions.length === 0 && (
        <Status message="No submissions found."></Status>
      )}

      {survey && submissions && submissions.length > 0 && (
        <div>
          <ReadOnlySurveyForm
            key={submissionIndex}
            survey={survey}
            responses={submissions[submissionIndex].responses}
          >
            <FormActions>
              <BackButton
                color="secondary"
                variant="contained"
                onClick={() => routerHistory.goBack()}
              >
                Back
              </BackButton>

              <ButtonSpacing></ButtonSpacing>

              <StyledPaginationButtons
                page={submissionIndex}
                maxPages={submissions.length}
                onPrev={(newPage) => setSubmissionIndex(newPage)}
                onNext={(newPage) => setSubmissionIndex(newPage)}
              ></StyledPaginationButtons>
            </FormActions>
          </ReadOnlySurveyForm>
        </div>
      )}
    </div>
  );
};

const FormActions = styled.div`
  display: flex;
`;

const BackButton = styled(Button)`
  flex: 1;
  max-width: 100px;
`;

const ButtonSpacing = styled.div`
  flex: 1;
`;

const StyledPaginationButtons = styled(PaginationButtons)`
  flex: 1;
`;

export default styled(SurveySubmissionsPage)`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;
