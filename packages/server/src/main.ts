import routes from './routes/index';
import { connect, createNewDatabase } from './db/index';
import { refreshLocalSurveys } from './surveys';

connect()
  .then(() => createNewDatabase())
  .then(() => {
    refreshLocalSurveys();
    routes();
  });
