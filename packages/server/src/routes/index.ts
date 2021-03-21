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

  const webPath = path.join(__dirname, '../../../web/build');
  console.log(`serving web app from '${webPath}'`);
  app.use(express.static(webPath));
  app.get('/', (req, res) => res.send('/index.html'));

  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};
