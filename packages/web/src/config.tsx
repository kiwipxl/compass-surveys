export const SERVER_URL: string = process.env.REACT_APP_API_URL as string;

if (SERVER_URL) {
  console.log(`using server url ${SERVER_URL}`);
} else {
  console.error('no server url was defined!');
}
