import routes from './routes';
import { createNewDatabase } from './db';
import { refreshLocalSurveys } from './surveys';

await createNewDatabase();

refreshLocalSurveys();

routes();
