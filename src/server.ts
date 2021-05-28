import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { routes } from './routes';
import './database/index';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(express.json());

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

export default app;
