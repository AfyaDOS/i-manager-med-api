import { Router } from 'express';
import { ServiceController } from '../../controllers/ServiceController';

const routesServices = Router();

const bloodTypeControlle = new ServiceController();

routesServices.get('/', bloodTypeControlle.getAll);
routesServices.post('/', bloodTypeControlle.set);

export { routesServices };
