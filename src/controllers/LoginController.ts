import {
  Request, Response,
} from 'express';
import {
  getRepository,
} from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../database/entity/User';

class LoginController {
  async login(req: Request, res: Response) {
    const repository = getRepository(User);
    const {
      email, password,
    } = req.body;

    const user = await repository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).send('usuário não autorizado');
    }
    const passwordIsValid = await bcrypt.compare(password, user?.password);

    if (!passwordIsValid) {
      return res.status(401).send('usuário não autorizado');
    }

    const token = jwt.sign({
      id: user.id, name: user.name,
    }, 'dotEnv', {
      expiresIn: '1d',
    });

    delete user.password;

    return res.json({
      user, token,
    });
  }
}

export default new LoginController();
