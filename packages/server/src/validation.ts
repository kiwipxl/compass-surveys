import schemaDefinitions from '@compass-surveys/common/src/definitions.json';
import { Validator, ValidatorResult } from 'jsonschema';

const validator = new Validator();

// Validates a json string or json object with a schema definition.
//
// Example:
// validateSchema(survey, '#/definitions/Survey');
//
export function validateSchema(
  json: string | object,
  ref: string,
): ValidatorResult {
  let jsonObj: object = {};
  if (json) {
    jsonObj = json instanceof Object ? json : JSON.parse(json);
  }

  const schema = Object.assign(
    {
      properties: {
        root: {
          $ref: ref,
        },
      },
    },
    schemaDefinitions,
  );

  return validator.validate({ root: jsonObj }, schema);
}
