import { Router } from 'express';
import { ServiceController } from '../../controllers/ServiceController';

const routesServices = Router();

const bloodTypeControlle = new ServiceController();

routesServices.post('/register', bloodTypeControlle.set);

export { routesServices };
