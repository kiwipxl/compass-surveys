import process from 'process';

export const SERVER_URL =
  process.env.WEB_SERVER_URL || 'http://localhost:4000/api/';

console.log(`Using server url at ${SERVER_URL}`);
