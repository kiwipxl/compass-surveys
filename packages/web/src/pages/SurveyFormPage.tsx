import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Survey } from '@compass-surveys/common';
import QuestionCard from '../components/QuestionCard';

type IProps = {
  className?: string;
};

const SurveyFormPage: React.FC<IProps> = ({ className }) => {
  // let { surveyId } = useParams();

  return (
    <div className={className}>
      <FormContainer>
        <QuestionCard title="Test" subtitle="Subtitle"></QuestionCard>
      </FormContainer>
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
