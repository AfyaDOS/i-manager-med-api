import { Request, Response, Router } from 'express';
import SpecialistController from '../../controllers/SpecialistController';
const routesSpecialist = Router();

routesSpecialist.get('/', SpecialistController.index);

export { routesSpecialist };
