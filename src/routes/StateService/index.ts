import { Router } from 'express';
import { ServiceStateController } from '../../controllers/ServiceStateController';

const routesStateService = Router();

const serviceStateControlle = new ServiceStateController();

routesStateService.get('/', serviceStateControlle.getAll);

export { routesStateService };
