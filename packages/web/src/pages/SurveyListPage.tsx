import React from 'react';
import styled from 'styled-components';
import { Survey } from '@compass-surveys/common';
import { SERVER_URL } from '../config';
import Status from '../components/Status';
import SurveyList from '../components/survey/SurveyList';

interface Props {
  className?: string;
}

const SurveyListPage: React.FC<Props> = ({ className }) => {
  const [surveys, setSurveys] = React.useState<Survey[]>();

  React.useEffect(() => {
    fetch(`${SERVER_URL}/surveys`)
      .then((res) => res.json())
      .then((obj) => {
        setSurveys(obj);
      });
  }, []);

  return (
    <div className={className}>
      {!surveys && <Status message="Loading..."></Status>}

      {surveys && (
        <Container>
          <SurveyList surveys={surveys}></SurveyList>
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

export default styled(SurveyListPage)`
  width: 100%;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
