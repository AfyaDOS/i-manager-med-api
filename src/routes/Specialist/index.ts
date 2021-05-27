import { Router } from 'express';
import SpecialistController from '../../controllers/SpecialistController';

const routesSpecialist = Router();

routesSpecialist.get('/', SpecialistController.index);
routesSpecialist.post('/', SpecialistController.createSpecialist);

export { routesSpecialist };
