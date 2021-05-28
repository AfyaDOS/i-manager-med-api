import { Router } from 'express';
import SpecialtiesController from '../../controllers/SpecialtiesController';

const routesSpecialties = Router();

routesSpecialties.get(
  '/:idSpecialist',
  SpecialtiesController.index,
);
routesSpecialties.post(
  '/:idSpecialist',
  SpecialtiesController.createSpecialties,
);
routesSpecialties.put(
  '/:id',
  SpecialtiesController.updateSpecialties,
);
routesSpecialties.delete(
  '/:id',
  SpecialtiesController.deleteSpecialties,
);

export { routesSpecialties };
