import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import SurveyFormPage from './pages/SurveyFormPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <Switch>
        <Route exact path="/survey/:surveyId">
          <SurveyFormPage></SurveyFormPage>
        </Route>

        <Route exact path="/"></Route>
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
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

export default App;
