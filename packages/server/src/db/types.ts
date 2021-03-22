import { Submission, Response } from '@compass-surveys/common';

// These are our database model types. They map to the values in SQL.
// We can call get() to convert them to our regular models that is shared between client/server.

export class SubmissionDB {
  id: string;
  survey_id: string;
  responses: ResponseDB[];
  date: string;

  constructor(row: any) {
    this.id = row.id;
    this.survey_id = row.survey_id;
    this.responses = [];
    this.date = row.date;
  }

  get(): Submission {
    return {
      id: this.id,
      surveyId: this.survey_id,
      responses: this.responses.map((r) => r.get()),
      date: this.date,
    };
  }
}

export class ResponseDB {
  id: string;
  question_id: string;
  value: string;

  constructor(row: any) {
    this.id = row.id;
    this.question_id = row.question_id;
    this.value = row.value;
  }

  get(): Response {
    return {
      id: this.id,
      questionId: this.question_id,
      value: this.value,
    };
  }
}
