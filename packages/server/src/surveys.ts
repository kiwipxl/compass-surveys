import { Survey } from '@compass-surveys/common';
import fs from 'fs';
import path from 'path';
import { __dirname } from './util';
import { validateSchema } from './validation';

export let localSurveys: Survey[] = [];

export function refreshLocalSurveys() {
  const surveys: Survey[] = [];
  const surveysDir = path.join(__dirname, '../surveys');

  for (const name of fs.readdirSync(surveysDir)) {
    const surveyObject = JSON.parse(
      fs.readFileSync(path.join(surveysDir, name), 'utf8'),
    );
    const validationRes = validateSchema(surveyObject, '#/definitions/Survey');

    if (validationRes.valid) {
      console.log(`loaded survey '${name}'`);
      surveys.push(surveyObject as Survey);
    } else {
      console.error(
        `Invalid survey '${name}'. Error: ${validationRes.errors[0]}`,
      );
    }
  }

  localSurveys = surveys;
}

export function getLocalSurvey(id: string) {
  return localSurveys.find((survey) => survey.id === id);
}
