import { Submission, Response } from '@compass-surveys/common';
import short from 'short-uuid';
import { dbClient } from './index';
import { createResponse, getAllResponses } from './responses';

export async function getSubmission(submissionId: string): Promise<Submission> {
  const query = {
    text: 'SELECT * from submissions WHERE id = $1',
    values: [submissionId],
  };

  const res = await dbClient.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  const submission: Submission = res.rows[0];
  submission.responses = await getAllResponses(submission.id);
  return submission;
}

export async function getAllSubmissions(
  surveyId: string,
): Promise<Submission[]> {
  const query = {
    text: 'SELECT * from submissions WHERE survey_id = $1',
    values: [surveyId],
  };

  const res = await dbClient.query(query);
  const submissions: Submission[] = res.rows;

  for (let submission of res.rows as Submission[]) {
    submission.responses = await getAllResponses(submission.id);
  }

  return submissions;
}

export async function createSubmission(
  surveyId: string,
  responses: Response[],
): Promise<Submission> {
  const query = {
    text: `
      INSERT INTO submissions(id, survey_id, date)
      VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING *`,
    values: [short.generate(), surveyId],
  };

  const res = await dbClient.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  let submission: Submission = res.rows[0];
  submission.responses = [];

  for (const res of responses) {
    submission.responses.push(
      await createResponse(submission.id, res.questionId, res.value),
    );
  }

  return submission;
}
