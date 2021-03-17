import { Survey } from '@compass-surveys/common';
import fs from 'fs';
import path from 'path';

// We have to emulate __dirname as we are using "module" as opposed to "commonjs"
// https://github.com/nodejs/help/issues/2907
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const surveys: Survey[] = [];
const surveysDir = path.join(__dirname, 'surveys');
for (const name of fs.readdirSync(surveysDir)) {
  const survey: Survey = JSON.parse(
    fs.readFileSync(path.join(surveysDir, name), 'utf8'),
  ) as Survey;

  surveys.push(survey);
}

console.log(surveys[0]);
