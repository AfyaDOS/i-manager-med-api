import { Router } from 'express';
import SpecialtiesController from '../../controllers/SpecialtiesController';

const routesSpecialties = Router();

routesSpecialties.get('/', SpecialtiesController.index);
routesSpecialties.post('/', SpecialtiesController.createSpecialties);
routesSpecialties.put('/:id', SpecialtiesController.updateSpecialties);
routesSpecialties.delete('/:id', SpecialtiesController.deleteSpecialties);

export { routesSpecialties };
