import 'reflect-metadata';
import app from './server';

<<<<<<< HEAD
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server linener in port ${port}`));
=======
const app = express();

app.use(express.json());
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

app.listen(5000, () => console.log('Server linener in port 5000'));
>>>>>>> 3ec61c9564992c790817bff183cad63dbf0eeada
