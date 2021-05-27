import { Router } from 'express';
import SpecialistController from '../../controllers/SpecialistController';
import authMiddleware from '../../middlewares/authMiddleware';

const routesSpecialist = Router();

routesSpecialist.get('/', authMiddleware, SpecialistController.index);
routesSpecialist.post(
  '/',
  authMiddleware,
  SpecialistController.createSpecialist,
);

export { routesSpecialist };
