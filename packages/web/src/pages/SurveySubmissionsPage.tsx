import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useParams, useHistory } from 'react-router-dom';
import useFetch from 'use-http';
import { SERVER_URL } from '../config';
import ReadOnlySurveyForm from '../components/survey/ReadOnlySurveyForm';
import Status from '../components/Status';
import ErrorStatus from '../components/ErrorStatus';
import StatusActions from '../components/StatusActions';
import PaginationButtons from '../components/PaginationButtons';

interface Props {
  className?: string;
}

const SurveySubmissionsPage: React.FC<Props> = ({ className }) => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const routerHistory = useHistory();

  const {
    loading: surveyLoading,
    error: surveyLoadError,
    data: survey,
  } = useFetch(`${SERVER_URL}/surveys/${surveyId}`, {}, []);
  const {
    loading: submissionsLoading,
    error: submissionsLoadError,
    data: submissions,
  } = useFetch(`${SERVER_URL}/surveys/${surveyId}/submissions`, {}, []);
  const [submissionIndex, setSubmissionIndex] = React.useState(0);

  return (
    <div className={className}>
      <Container>
        {(surveyLoadError || submissionsLoadError) && (
          <div>
            <ErrorStatus
              message={
                surveyLoadError
                  ? surveyLoadError.message
                  : submissionsLoadError.message
              }
            ></ErrorStatus>
            <StatusActions></StatusActions>
          </div>
        )}

        {submissions && submissions.length === 0 && (
          <div>
            <Status message="No submissions found."></Status>
            <StatusActions></StatusActions>
          </div>
        )}

        {surveyLoading && !surveyLoadError && (
          <Status message="Loading..." loading></Status>
        )}

        {!surveyLoading &&
          !surveyLoadError &&
          !submissionsLoading &&
          !submissionsLoadError &&
          submissions.length > 0 && (
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
          )}
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const FormActions = styled.div`
  display: flex;
  margin: 20px;
  width: 100%;
  max-width: 600px;
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
`;
