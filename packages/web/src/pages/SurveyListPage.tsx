import React from 'react';
import styled from 'styled-components';
import { SERVER_URL } from '../config';
import useFetch from 'use-http';
import { Survey } from '@compass-surveys/common';
import Status from '../components/Status';
import ErrorStatus from '../components/ErrorStatus';
import SurveyList from '../components/survey/SurveyList';
import logo from '../assets/logo.png';

interface Props {
  className?: string;
}

const SurveyListPage: React.FC<Props> = ({ className }) => {
  const { loading, error, data: surveys } = useFetch<Survey[]>(
    `${SERVER_URL}/surveys`,
    {},
    [],
  );

  return (
    <div className={className}>
      <LogoContainer>
        <Logo src={logo} alt="Logo"></Logo>
      </LogoContainer>

      <Content>
        {error && <ErrorStatus message={error.message}></ErrorStatus>}

        {loading && !error && <Status message="Loading..." loading></Status>}

        {!loading && !error && surveys && (
          <SurveyList surveys={surveys}></SurveyList>
        )}
      </Content>
    </div>
  );
};

const LogoContainer = styled.div`
  margin-top: -20px;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const Logo = styled.img`
  width: 100%;
`;

const Content = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
`;

export default styled(SurveyListPage)`
  width: 100%;
  margin-top: 40px;
`;
