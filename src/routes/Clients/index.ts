import { Router } from 'express';
import { ClientsController } from '../../controllers/ClientsController';

const routesClients = Router();

const clientsControlle = new ClientsController();

routesClients.get('/', clientsControlle.getAll);
routesClients.post('/', clientsControlle.set);
routesClients.put('/:id', clientsControlle.update);
routesClients.delete('/:id', clientsControlle.remove);

export { routesClients };
