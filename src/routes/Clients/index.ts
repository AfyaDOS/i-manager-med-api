import {
  Router,
} from 'express';
import {
  ClientsController,
} from '../../controllers/ClientsController';

const routesClients = Router();

const clientsControlle = new ClientsController();

routesClients.post('/register', clientsControlle.set);

export {
  routesClients,
};
