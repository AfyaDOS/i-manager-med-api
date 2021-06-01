import { Router } from 'express';
import UserController from '../../controllers/UsersController';

const routesUsers = Router();

routesUsers.get('/', UserController.index);
routesUsers.post('/', UserController.createUser);
routesUsers.delete('/:id', UserController.deleteUser);
routesUsers.put('/:id', UserController.updateUser);

export { routesUsers };
