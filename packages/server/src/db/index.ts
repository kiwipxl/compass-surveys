import pg from 'pg';
const { Pool } = pg;
import process from 'process';

let connectionString: string = process.env.DATABASE_URL as string;

/*
By default node-postgres uses the following environment variables to
configure a connection.

{
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE, 
  password: process.env.PGPASSWORD, 
  port: process.env.PGPORT
}

If we have DATABASE_URL set however (such as when using heroku in a production environment), we'll
use that instead.
*/
export const dbClient = new Pool({ connectionString: connectionString });

export async function connect() {
  if (connectionString) {
    console.log(`connecting to database '${connectionString as string}'`);
  } else {
    console.log(
      `connecting to database '${process.env.PGDATABASE}' at ${process.env.PGHOST}:${process.env.PGPORT} with user '${process.env.PGUSER}'`,
    );
  }
  return await dbClient.connect();
}

export async function createNewDatabase() {
  const query = {
    text: `
      DROP TABLE IF EXISTS responses;
      DROP TABLE IF EXISTS submissions;

      CREATE TABLE submissions (
        id VARCHAR(64) PRIMARY KEY, 
        survey_id VARCHAR(64) NOT NULL, 
        date TIMESTAMPTZ NOT NULL
      );

      CREATE TABLE responses (
        id VARCHAR(64) PRIMARY KEY, 
        submission_id VARCHAR(64) NOT NULL, 
        question_id VARCHAR(64) NOT NULL, 
        value TEXT, 

        CONSTRAINT fk_submission_id
          FOREIGN KEY(submission_id)
            REFERENCES submissions(id)
              ON DELETE CASCADE
      );
    `,
  };

  return await dbClient.query(query);
}
