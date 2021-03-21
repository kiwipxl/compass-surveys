import express from 'express';
import { getLocalSurvey } from '../surveys';
import {
  createSubmission,
  getSubmission,
  getAllSubmissions,
} from '../db/submissions';
import { validateSchema } from '../validation';
import { Submission } from '@compass-surveys/common';

const router = express.Router();

router.get('/surveys/:surveyId/submissions/:submissionId', async (req, res) => {
  const survey = getLocalSurvey(req.params.surveyId);
  if (!survey) {
    res.status(404);
    res.send({ error: 'Survey does not exist' });
    return;
  }

  const submission = await getSubmission(req.params.submissionId);
  if (!submission) {
    res.status(404);
    res.send({ error: 'Submission does not exist' });
    return;
  }

  res.send(submission);
});

router.get('/surveys/:surveyId/submissions', async (req, res) => {
  const survey = getLocalSurvey(req.params.surveyId);
  if (!survey) {
    res.status(404);
    res.send({ error: 'Survey does not exist' });
    return;
  }

  res.send(await getAllSubmissions(survey.id));
});

router.post('/surveys/:surveyId/submissions', async (req, res) => {
  const survey = getLocalSurvey(req.params.surveyId);
  if (!survey) {
    res.status(404);
    res.send('Survey does not exist');
    return;
  }

  const validateRes = validateSchema(req.body, '#/definitions/Submission');
  if (!validateRes.valid) {
    res.status(400);
    res.send({ error: validateRes.errors[0].stack });
    return;
  }

  const submissionReq = req.body as Submission;
  const submission = await createSubmission(survey.id, submissionReq.responses);

  res.send(submission);
});

export default router;
