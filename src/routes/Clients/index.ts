import { Request, Response, Router } from 'express';

const routesClients = Router();

routesClients.get('/register', (req: Request, res: Response) => {
  res.send('Register Router');
});

export { routesClients };
