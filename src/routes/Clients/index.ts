import { Router } from 'express';
import { ClientsController } from '../../controllers/ClientsController';

const routesClients = Router();

const clientsControlle = new ClientsController();

routesClients.post('/register', clientsControlle.set);
routesClients.get('/all', clientsControlle.getAll);

export { routesClients };
