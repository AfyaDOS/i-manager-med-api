import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import connection from '../../database';
import User from '../../database/entity/User';

class UserController {
  async index(req: Request, res: Response) {
    try {
      await connection.create();
      const repository = getRepository(User);
      const userExists = await repository.find();
      await connection.close();
      return res.status(200).json(userExists);
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      await connection.create();
      const repository = getRepository(User);
      const { email, password, name } = req.body;

      const passwordCrypt = bcrypt.hashSync(password, 8);

      const emailExists = await repository.findOne({ where: { email } });
      if (emailExists) {
        await connection.close();
        return res.status(409).send('Email já cadastrado');
      }

      const user = repository.create({ name, email, password: passwordCrypt });

      await repository.save(user);
      await connection.close();
      return res.status(200).json(user);
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      await connection.create();
      const repository = getRepository(User);
      const { id } = req.params;
      const { email, password, name } = req.body;

      const emailExists = await repository.findOne({ where: { email } });

      if (emailExists && emailExists.password !== password) {
        await connection.close();
        return res.status(409).send('Email já cadastrado');
      }

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
      await connection.close();
      return res.status(200).json(user);
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await connection.create();
      const repository = getRepository(User);
      const { id } = req.params;
      const userExists = await repository.findOne(id);

      if (!userExists) {
        await connection.close();
        return res.status(404).send('Usuário não encontrado');
      }
      await repository.delete(id);
      await connection.close();
      return res.status(200).send('Usuário deletado com sucesso');
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }
}

export default new UserController();
