import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useParams, useHistory } from 'react-router-dom';
import useFetch, { CachePolicies } from 'use-http';
import { SERVER_URL } from '../config';
import SubmissionSurveyForm from '../components/survey/SubmissionSurveyForm';
import Status from '../components/Status';
import ErrorStatus from '../components/ErrorStatus';
import StatusActions from '../components/StatusActions';
import PaginationButtons from '../components/PaginationButtons';

interface Props {
  className?: string;
}

const SurveySubmissionsPage: React.FC<Props> = ({ className }) => {
  // Grab survey id from browser URL
  let { surveyId } = useParams<{ surveyId: string }>();
  const routerHistory = useHistory();

  // Fetch the survey data
  const {
    loading: surveyLoading,
    error: surveyLoadError,
    data: survey,
  } = useFetch(`${SERVER_URL}/surveys/${surveyId}`, {}, []);

  // Fetch all submissions.
  // In the future, if we for some reason had thousands of
  // submissions, we'd fetch each one individually for the current submission being displayed.
  const {
    loading: submissionsLoading,
    error: submissionsLoadError,
    data: submissions,
  } = useFetch(
    `${SERVER_URL}/surveys/${surveyId}/submissions`,
    { cachePolicy: CachePolicies.NO_CACHE },
    [],
  );

  const loading = surveyLoading || submissionsLoading;
  const error = surveyLoadError || submissionsLoadError;

  // Describes which submission to display
  const [submissionIndex, setSubmissionIndex] = React.useState(0);

  return (
    <div className={className}>
      <Container>
        {error && (
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

        {!loading && !error && submissions.length === 0 && (
          <div>
            <Status message="No submissions found."></Status>
            <StatusActions></StatusActions>
          </div>
        )}

        {loading && !error && <Status message="Loading..." loading></Status>}

        {!loading && !error && submissions.length > 0 && (
          <div>
            <StyledPaginationButtons
              page={submissionIndex}
              maxPages={submissions.length}
              onPrev={(newPage) => setSubmissionIndex(newPage)}
              onNext={(newPage) => setSubmissionIndex(newPage)}
            ></StyledPaginationButtons>

            <SubmissionSurveyForm
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
            </SubmissionSurveyForm>
          </div>
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
  margin-bottom: 40px;
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
