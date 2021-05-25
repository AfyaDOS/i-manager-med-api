import { Router } from 'express';
import { routesClients } from './Clients';
import { routesSpecialist } from './Specialist';

const routes = Router();

routes.use('/clients', routesClients);
routes.use('/specialist', routesSpecialist);

export { routes };
