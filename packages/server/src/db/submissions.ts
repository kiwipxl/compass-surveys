import short from 'short-uuid';
import { Submission, Response } from '@compass-surveys/common';
import { dbClient } from './index';
import { createResponse, getAllResponses } from './responses';
import { SubmissionDB } from './types';

export async function getSubmission(
  submissionId: string,
): Promise<Submission | null> {
  const query = {
    text: 'SELECT * from submissions WHERE id = $1',
    values: [submissionId],
  };

  const res = await dbClient.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  const submission = new SubmissionDB(res.rows[0]).get();
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
  const submissions: Submission[] = res.rows.map((s) =>
    new SubmissionDB(s).get(),
  );

  for (let submission of submissions) {
    submission.responses = await getAllResponses(submission.id);
  }

  return submissions;
}

export async function createSubmission(
  surveyId: string,
  responses: Response[],
): Promise<Submission | null> {
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

  const submission: Submission = new SubmissionDB(res.rows[0]).get();
  submission.responses = [];

  for (const r of responses) {
    const response = await createResponse(submission.id, r.questionId, r.value);
    if (response) {
      submission.responses.push(response);
    }
  }

  return submission;
}
