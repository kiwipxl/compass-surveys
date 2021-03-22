import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import useFetch from 'use-http';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import { Survey } from '@compass-surveys/common';
import { SERVER_URL } from '../config';
import SurveyForm, { SubmitState } from '../components/survey/SurveyForm';
import SurveyFormSubmitted from '../components/survey/SurveyFormSubmitted';
import Status from '../components/Status';
import ErrorStatus from '../components/ErrorStatus';
import StatusActions from '../components/StatusActions';

interface Props {
  className?: string;
}

const SurveyFormPage: React.FC<Props> = ({ className }) => {
  // Grab survey id from browser URL
  let { surveyId } = useParams<{ surveyId: string }>();
  // Fetch survey data
  const { loading, error, data: survey } = useFetch<Survey>(
    `${SERVER_URL}/surveys/${surveyId}`,
    {},
    [],
  );

  const routerHistory = useHistory();

  // Used just for snackbar (toast) when there's a submit error
  const [showSubmitError, setShowSubmitError] = React.useState(false);
  // Survey submit state (whether we're submitting, submitted, etc.)
  const [submitState, setSubmitState] = React.useState<SubmitState>({
    submitting: false,
  });

  return (
    <div className={className}>
      <Container>
        <Snackbar
          open={showSubmitError}
          autoHideDuration={3000}
          onClose={() => setShowSubmitError(false)}
        >
          <Alert severity="error" onClose={() => setShowSubmitError(false)}>
            {submitState.error && submitState.error.message}
          </Alert>
        </Snackbar>

        {error && (
          <div>
            <ErrorStatus message={error.message}></ErrorStatus>
            <StatusActions></StatusActions>
          </div>
        )}

        {loading && !error && <Status message="Loading..." loading></Status>}

        {survey && submitState.submission && (
          <SurveyFormSubmitted title={survey.name}></SurveyFormSubmitted>
        )}

        {!loading && !error && !submitState.submission && (
          <div>
            <SurveyForm
              survey={survey as Survey}
              onSubmitStateChange={(state) => {
                setSubmitState(state);
                setShowSubmitError(state.error !== undefined);
              }}
              disabled={submitState.submitting}
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

                <SubmitButton type="submit" color="primary" variant="contained">
                  Submit
                </SubmitButton>
              </FormActions>
            </SurveyForm>
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
`;

const BackButton = styled(Button)`
  flex: 1;
  max-width: 100px;
`;

const ButtonSpacing = styled.div`
  flex: 1;
`;

const SubmitButton = styled(Button)`
  flex: 1;
  max-width: 100px;
`;

export default styled(SurveyFormPage)`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 20px;
`;
