import { Router } from 'express';
import { routesClients } from './Clients';
import { routesSpecialist } from './Specialist';
import { routesUsers } from './Users';


const routes = Router();

routes.use('/users', routesSpecialist);
routes.use('/clients', routesClients);
routes.use('/specialist', routesUsers);


export { routes };
