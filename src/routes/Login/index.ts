import { Request, Response, Router } from 'express';
import LoginController from '../../controllers/LoginController';

const routesLogin = Router();

routesLogin.post('/', LoginController.login)

export { routesLogin };
