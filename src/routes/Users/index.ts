import { Router } from 'express';
import UserController from '../../controllers/UserController';
import authMiddleware from '../../middlewares/authMiddleware';

const routesUsers = Router();

routesUsers.get('/', authMiddleware, UserController.index);
routesUsers.post('/', UserController.createUser);
routesUsers.delete('/:id', UserController.deleteUser);

export { routesUsers };
