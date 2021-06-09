import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../../database/entity/User';
import connection from '../../database';

class LoginController {
  async login(req: Request, res: Response) {
    try {
      await connection.create();

      const repository = getRepository(User);

      const { email, password } = req.body;

      const user = await repository.findOne({ where: { email } });

      await connection.close();

      if (!user) {
        return res.status(401).json({ error: true, message: 'Usuario não encontrado !!' });
      }
      // @ts-ignore
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({ error: true, message: 'Senha invalida !!' });
      }

      const token = jwt.sign({ id: user.id, name: user.name }, 'dotEnv', { expiresIn: '1d' });
      // @ts-ignore
      delete user.password;

      return res.status(200).json({ user, token });
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }
}

export default new LoginController();
