import process from 'process';

let url: string = '';
if (process.env.NODE_ENV === 'production') {
  url = 'http://localhost/api';
} else {
  url = 'http://localhost:4000/api/';
}
export const SERVER_URL = url;

console.log(`Using server url at ${SERVER_URL}`);
