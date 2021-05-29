import { Router } from 'express';
import { routesLogin } from './Login';
import { routesClients } from './Clients';
import { routesSpecialist } from './Specialist';
import { routesUsers } from './Users';
import { routesSpecialties } from './Specialties';
import authMiddleware from '../middlewares/authMiddleware';
import { routesBloodType } from './BloodType';

const routes = Router();

routes.use('/login', routesLogin);
routes.use('/users', routesUsers);
routes.use('/clients', routesClients);
routes.use('/specialist', authMiddleware, routesSpecialist);
routes.use('/specialties', authMiddleware, routesSpecialties);
routes.use('/bloodtype', routesBloodType);

export { routes };
