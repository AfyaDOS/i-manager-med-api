import { Request, Response, Router } from 'express';

const routesSpecialist = Router();

routesSpecialist.get('/register', (req: Request, res: Response) => {
  res.send('Register Router');
});

export { routesSpecialist };
