import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import User from '../../database/entity/User';
import typeorm from '../../database/index';

class UserController {
  async index(req: Request, res: Response) {
    try {
      await typeorm.create();
      const repository = getRepository(User);
      const userExists = await repository.find();
      await typeorm.close();
      return res.status(200).json(userExists);
    } catch (error) {
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      await typeorm.create();

      const repository = getRepository(User);
      const { email, password, name } = req.body;

      const passwordCrypt = bcrypt.hashSync(password, 8);

      const emailExists = await repository.findOne({ where: { email } });

      if (emailExists) {
        return res.status(409).send('Email já cadastrado');
      }

      const user = repository.create({ name, email, password: passwordCrypt });

      await repository.save(user);
      await typeorm.close();

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const repository = getRepository(User);
      const { id } = req.params;
      const { email, password, name } = req.body;

      const user = await repository.findOne(id);
      const passwordCrypt = bcrypt.hashSync(password, 8);

      // @ts-ignore
      user.name = name;
      // @ts-ignore
      user.email = email;
      // @ts-ignore
      user.password = passwordCrypt;
      // @ts-ignore

      await repository.save(user);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const repository = getRepository(User);
      const { id } = req.params;
      const userExists = await repository.findOne(id);

      if (!userExists) {
        return res.status(404).send('Usuário não encontrado');
      }
      await repository.delete(id);

      return res.status(200).send('Usuário deletado com sucesso');
    } catch (error) {
      return res.status(404).json({ error: true, message: error.message });
    }
  }
}

export default new UserController();
