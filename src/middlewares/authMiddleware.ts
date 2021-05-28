import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }
  const token = authorization.replace('Bearer', '').trim();

  try {
    jwt.verify(token, 'dotEnv');

    return next();
  } catch {
    return res.sendStatus(401);
  }
}
