import short from 'short-uuid';
import { Response } from '@compass-surveys/common';
import { dbClient } from './index';
import { ResponseDB } from './types';

export async function getResponse(
  responseId: string,
): Promise<Response | null> {
  const query = {
    text: 'SELECT * from responses WHERE id = $1',
    values: [responseId],
  };

  const res = await dbClient.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return new ResponseDB(res.rows[0]).get();
}

export async function getAllResponses(
  submissionId: string,
): Promise<Response[]> {
  const query = {
    text: 'SELECT * from responses WHERE submission_id = $1',
    values: [submissionId],
  };

  const res = await dbClient.query(query);
  return res.rows.map((r) => new ResponseDB(r).get());
}

export async function createResponse(
  submissionId: string,
  questionId: string,
  value: string,
): Promise<Response | null> {
  const query = {
    text: `
      INSERT INTO responses(id, submission_id, question_id, value)
      VALUES($1, $2, $3, $4) RETURNING *`,
    values: [short.generate(), submissionId, questionId, value],
  };

  const res = await dbClient.query(query);
  if (res.rowCount === 0) {
    return null;
  }

  return new ResponseDB(res.rows[0]).get();
}
