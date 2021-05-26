import { Request, Response, Router } from 'express';
import UserController from '../../controllers/UsersController';
import authMiddleware from '../../middlewares/authMiddleware';


const routesUsers = Router();

routesUsers.get('/', authMiddleware, UserController.index);
routesUsers.post('/', UserController.createUser);
routesUsers.delete('/:id', UserController.deleteUser);
routesUsers.put('/:id', UserController.updateUser);




export { routesUsers };