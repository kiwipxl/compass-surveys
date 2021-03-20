import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { Survey, Submission } from '@compass-surveys/common';
import { SERVER_URL } from '../config';
import SurveyForm from '../components/survey/SurveyForm';
import SurveyFormSubmitted from '../components/survey/SurveyFormSubmitted';
import Status from '../components/Status';

interface Props {
  className?: string;
}

interface SubmitState {
  submitting: boolean;
  submission: Submission | null;
}

const SurveyFormPage: React.FC<Props> = ({ className }) => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = React.useState<Survey>();
  const routerHistory = useHistory();
  const [submitState, setSubmitState] = React.useState<SubmitState>({
    submitting: false,
    submission: null,
  });

  React.useEffect(() => {
    fetch(`${SERVER_URL}/surveys/${surveyId}`)
      .then((res) => res.json())
      .then((obj) => {
        setSurvey(obj);
      });
  }, []);

  const handleSubmit = () => {
    setSubmitState({ submitting: true, submission: null });
  };

  const handleSubmitComplete = (submission: Submission) => {
    setSubmitState({ submitting: false, submission: submission });
  };

  return (
    <div className={className}>
      {!survey && <Status message="Loading..."></Status>}

      {submitState.submitting && <Status message="Submitting..."></Status>}

      {survey && submitState.submission && (
        <SurveyFormSubmitted title={survey.name}></SurveyFormSubmitted>
      )}

      {survey && !submitState.submitting && !submitState.submission && (
        <SurveyForm
          survey={survey}
          onSubmit={handleSubmit}
          onSubmitComplete={handleSubmitComplete}
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

const SubmitButton = styled(Button)`
  flex: 1;
  max-width: 100px;
`;

export default styled(SurveyFormPage)`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;
