import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { __dirname } from './util';
import { localSurveys, getLocalSurvey } from './surveys';
import {
  createSubmission,
  getSubmission,
  getAllSubmissions,
} from './db/submissions';
import { getResponse, getAllResponses } from './db/responses';
import { validateSchema } from './validation';
import { PostSubmissionRequest } from '@compass-surveys/common';

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

  const validateRes = validateSchema(
    req.body,
    '#/definitions/PostSubmissionRequest',
  );
  if (!validateRes.valid) {
    res.status(400);
    res.send({ error: validateRes.errors[0].message });
    return;
  }

  const submissionReq = req.body as PostSubmissionRequest;
  const submission = await createSubmission(survey.id, submissionReq.responses);

  res.send(submission);
});

export default () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api', router);

  app.listen(4000, () => {
    console.log('server started');
  });
};
