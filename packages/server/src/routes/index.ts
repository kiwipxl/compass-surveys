import express from 'express';
import cors from 'cors';
import process from 'process';
import path from 'path';
import bodyParser from 'body-parser';
import surveys from './surveys';
import submissions from './submissions';

const PORT = process.env.PORT || 4000;

export default () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/api', surveys);
  app.use('/api', submissions);

  app.use(express.static(path.join(__dirname, '../../web/build')));

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};
