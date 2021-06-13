import { Router } from 'express';
import { ClientsController } from '../../controllers/ClientsController';

const routesClients = Router();

const clientsControlle = new ClientsController();

routesClients.get('/', clientsControlle.getAll);
routesClients.post('/register', clientsControlle.set);
routesClients.delete('/:id', clientsControlle.remove);

export { routesClients };
