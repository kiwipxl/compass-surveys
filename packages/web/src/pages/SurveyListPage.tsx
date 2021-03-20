import React from 'react';
import styled from 'styled-components';
import { Survey } from '@compass-surveys/common';
import { SERVER_URL } from '../config';
import Status from '../components/Status';
import SurveyList from '../components/survey/SurveyList';
import logo from '../assets/logo.png';

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
      <LogoContainer>
        <Logo src={logo} alt="Logo"></Logo>
      </LogoContainer>

      <Content>
        {!surveys && <Status message="Loading..."></Status>}

        {surveys && (
          <Container>
            <SurveyList surveys={surveys}></SurveyList>
          </Container>
        )}
      </Content>
    </div>
  );
};

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -40px;
  margin-bottom: 40px;
`;

const Logo = styled.img`
  max-width: 800px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

export default styled(SurveyListPage)`
  width: 100%;
  margin-top: 40px;
`;
