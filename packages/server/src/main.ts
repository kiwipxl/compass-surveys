import dotenv from 'dotenv';
// Loads .env config and puts all the values into process.env. This must be the first thing we do!
dotenv.config();

import routes from './routes/index';
import { dbClient, connect, createNewDatabase } from './db/index';
import { refreshLocalSurveys } from './surveys';
import { PG_UNDEFINED_TABLE } from '@drdgvhbh/postgres-error-codes';

connect()
  .then(async () => {
    try {
      await dbClient.query('SELECT * FROM submissions LIMIT 1');
      await dbClient.query('SELECT * FROM responses LIMIT 1');
    } catch (err) {
      if (err.code === PG_UNDEFINED_TABLE) {
        console.log('Failed to find tables. Creating new database...');
        await createNewDatabase();
      } else {
        throw err;
      }
    }
  })
  .then(() => {
    refreshLocalSurveys();
    routes();
  });
