import 'reflect-metadata';
import express from 'express';
import { routes } from './routes';
import './database/index';


const app = express();


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
app.use(express.json());

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);


app.listen(5000, () => console.log('Server linener in port 5000'));
