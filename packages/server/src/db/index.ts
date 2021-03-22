import pg, { Pool } from 'pg';
import process from 'process';

let prod: boolean = process.env.NODE_ENV === 'production';

export let dbClient: Pool;
if (prod) {
  // Connect to the production database.
  // https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
  dbClient = new Pool({
    connectionString: process.env.DATABASE_URL as string,
    ssl: { rejectUnauthorized: false },
  });
} else {
  dbClient = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });
}

export async function connect() {
  if (prod) {
    console.log(
      `connecting to production database '${
        process.env.DATABASE_URL as string
      }'`,
    );
  } else {
    console.log(
      `connecting to database '${process.env.DB_DATABASE}' at ${process.env.DB_HOST}:${process.env.DB_PORT} with user '${process.env.DB_USER}'`,
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
