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

routesSpecialist.put(
  '/:id',
  authMiddleware,
  SpecialistController.updateSpecialist,
);
routesSpecialist.delete(
  '/:id',
  authMiddleware,
  SpecialistController.deleteSpecialist,
);

export { routesSpecialist };
