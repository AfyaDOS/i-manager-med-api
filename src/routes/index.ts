import { Router } from 'express';
import { routesLogin } from './Login';
import { routesClients } from './Clients';
import { routesSpecialist } from './Specialist';
import { routesUsers } from './Users';
import { routesSpecialties } from './Specialties';
import authMiddleware from '../middlewares/authMiddleware';
import { routesBloodType } from './BloodType';
import { routesServices } from './Services';
import { routesMedRecord } from './MedRecord';
import { routesStateService } from './StateService';

const routes = Router();

routes.use('/login', routesLogin);
routes.use('/users', authMiddleware, routesUsers);
routes.use('/clients', authMiddleware, routesClients);
routes.use('/specialist', authMiddleware, routesSpecialist);
routes.use('/specialties', authMiddleware, routesSpecialties);
routes.use('/bloodtype', authMiddleware, routesBloodType);
routes.use('/services', authMiddleware, routesServices);
routes.use('/medrecord', authMiddleware, routesMedRecord);
routes.use('/servicestate', authMiddleware, routesStateService);

export { routes };
