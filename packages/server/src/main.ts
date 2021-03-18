import { Survey } from '@compass-surveys/common';
import surveySchemaDefs from '@compass-surveys/common/src/surveyDefinitions.schema.json';
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { Validator } from 'jsonschema';
import { __dirname } from './util';

function readSurveysDir(): Survey[] {
  const surveySchema = Object.assign(
    {
      properties: {
        root: {
          $ref: '#/definitions/Survey',
        },
      },
    },
    surveySchemaDefs,
  );

  const validator = new Validator();

  const surveys: Survey[] = [];
  const surveysDir = path.join(__dirname, '../surveys');

  for (const name of fs.readdirSync(surveysDir)) {
    const surveyObject = JSON.parse(
      fs.readFileSync(path.join(surveysDir, name), 'utf8'),
    );
    const validationRes = validator.validate(
      { root: surveyObject },
      surveySchema,
    );

    if (validationRes.valid) {
      console.log(`loaded survey '${name}'`);
      surveys.push(surveyObject as Survey);
    } else {
      console.error(
        `Invalid survey '${name}'. Error: ${validationRes.errors[0]}`,
      );
    }
  }

  return surveys;
}

const surveys = readSurveysDir();

const app = express();

app.use(cors());

app.get('/surveys', (req, res) => {
  res.send(surveys);
});

app.listen(4000, () => {
  console.log('server started');
});
