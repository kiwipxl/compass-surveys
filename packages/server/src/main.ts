import routes from './routes/index';
import { createNewDatabase } from './db/index';
import { refreshLocalSurveys } from './surveys';

createNewDatabase().then(() => {
  refreshLocalSurveys();
  routes();
});
