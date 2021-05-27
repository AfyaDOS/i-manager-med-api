import {
  Router,
} from 'express';
import {
  routesLogin,
} from './Login';
import {
  routesClients,
} from './Clients';
import {
  routesSpecialist,
} from './Specialist';
import {
  routesUsers,
} from './Users';

const routes = Router();

routes.use('/login', routesLogin);

routes.use('/users', routesUsers);
routes.use('/clients', routesClients);
routes.use('/specialist', routesSpecialist);

export {
  routes,
};
