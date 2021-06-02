import { Router } from 'express';
import { BloodTypeController } from '../../controllers/BloodTypeController';

const routesBloodType = Router();

const bloodTypeControlle = new BloodTypeController();

routesBloodType.get('/all', bloodTypeControlle.getAll);

export { routesBloodType };
