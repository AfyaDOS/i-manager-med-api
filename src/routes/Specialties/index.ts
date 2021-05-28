import { Router } from 'express';
import SpecialtiesController from '../../controllers/SpecialtiesController';
import authMiddleware from '../../middlewares/authMiddleware';

const routesSpecialties = Router();

routesSpecialties.get(
  '/:idSpecialist',
  authMiddleware,
  SpecialtiesController.index,
);
routesSpecialties.post(
  '/:idSpecialist',
  authMiddleware,
  SpecialtiesController.createSpecialties,
);
routesSpecialties.put(
  '/:id',
  authMiddleware,
  SpecialtiesController.updateSpecialties,
);
routesSpecialties.delete(
  '/:id',
  authMiddleware,
  SpecialtiesController.deleteSpecialties,
);

export { routesSpecialties };
