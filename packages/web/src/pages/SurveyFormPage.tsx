import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Survey } from '@compass-surveys/common';
import QuestionCard from '../components/QuestionCard';
import { SERVER_URL } from '../config';

interface Props {
  className?: string;
}

const SurveyFormPage: React.FC<Props> = ({ className }) => {
  let { surveyId } = useParams<{ surveyId: string }>();
  const [survey, setSurvey] = React.useState<Survey>();

  useEffect(() => {
    fetch(`${SERVER_URL}/surveys/${surveyId}`)
      .then((res) => res.json())
      .then((obj) => {
        setSurvey(obj);
      });
  }, []);

  return (
    <div className={className}>
      {!survey && <div>Loading...</div>}

      {survey && (
        <FormContainer>
          {survey.questions.map((q) => (
            <QuestionCard
              key={q.id}
              title={q.title}
              subtitle={q.subtitle}
              required={q.required || false}
              question={q}
            ></QuestionCard>
          ))}
        </FormContainer>
      )}
    </div>
  );
};

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
`;

export default styled(SurveyFormPage)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
