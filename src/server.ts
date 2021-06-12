import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { routes } from './routes';
import swaggerDocument from '../swagger.json';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

export default app;
