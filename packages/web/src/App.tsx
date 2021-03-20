import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import SurveyFormPage from './pages/SurveyFormPage';
import SurveySubmissionsPage from './pages/SurveySubmissionsPage';
import SurveyListPage from './pages/SurveyListPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Switch>
        <Route exact path="/surveys/:surveyId/submissions">
          <SurveySubmissionsPage></SurveySubmissionsPage>
        </Route>

        <Route exact path="/surveys/:surveyId">
          <SurveyFormPage></SurveyFormPage>
        </Route>

        <Route exact path="/">
          <SurveyListPage></SurveyListPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;

    background-color: #eeeeee;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

export default App;
