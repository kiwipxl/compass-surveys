import express from 'express';
import { localSurveys, getLocalSurvey } from '../surveys';

const router = express.Router();

router.get('/surveys', (req, res) => {
  res.send(localSurveys);
});

router.get('/surveys/:surveyId', (req, res) => {
  const survey = getLocalSurvey(req.params.surveyId);
  if (!survey) {
    res.status(404);
    res.send('Survey does not exist');
    return;
  }

  res.send(survey);
});

export default router;
