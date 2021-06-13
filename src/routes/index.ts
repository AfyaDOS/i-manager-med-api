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
routes.use('/users', routesUsers);
routes.use('/clients', routesClients);
routes.use('/specialist', routesSpecialist);
routes.use('/specialties', routesSpecialties);
routes.use('/bloodtype', routesBloodType);
routes.use('/services', routesServices);
routes.use('/medrecord', routesMedRecord);
routes.use('/servicestate', routesStateService);

export { routes };
