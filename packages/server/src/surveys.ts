import { Survey } from '@compass-surveys/common';
import fs from 'fs';
import path from 'path';
import { validateSchema } from './validation';

export let localSurveys: Survey[] = [];

// Reads all surveys from the '/surveys' directory, validates them, and updates
// our localSurveys list.
export function refreshLocalSurveys() {
  const surveys: Survey[] = [];
  const surveysDir = path.join(__dirname, '../surveys');

  for (const name of fs.readdirSync(surveysDir)) {
    // Read survey.json
    const surveyObject = JSON.parse(
      fs.readFileSync(path.join(surveysDir, name), 'utf8'),
    );
    // Validate schema
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
