import { Router } from 'express';
import { routesLogin } from './Login';
import { routesClients } from './Clients';
import { routesSpecialist } from './Specialist';
import { routesUsers } from './Users';
import { routesSpecialties } from './Specialties';

const routes = Router();

routes.use('/login', routesLogin);
routes.use('/users', routesUsers);
routes.use('/clients', routesClients);
routes.use('/specialist', routesSpecialist);
<<<<<<< HEAD
=======
routes.use('/specialties', routesSpecialties);
>>>>>>> 3ec61c9564992c790817bff183cad63dbf0eeada

export { routes };
