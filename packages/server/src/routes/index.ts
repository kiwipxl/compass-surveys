import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import surveys from './surveys';
import submissions from './submissions';

const PORT = 4000;

export default () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api', surveys);
  app.use('/api', submissions);

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};
