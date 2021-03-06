import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import User from '../../database/entity/User';
import typeOrmConnection from '../../database';

class UserController {
  async index(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();
      const repository = getRepository(User);
      const userExists = await repository.find();

      await typeOrmConnection.close();

      return res.status(200).json(userExists);
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();
      const repository = getRepository(User);
      const { email, password, name } = req.body;

      const passwordCrypt = bcrypt.hashSync(password, 8);

      const emailExists = await repository.findOne({ where: { email } });

      if (emailExists) {
        await typeOrmConnection.close();
        return res.status(409).send('Email já cadastrado');
      }

      const user = repository.create({ name, email, password: passwordCrypt });

      await repository.save(user);

      await typeOrmConnection.close();

      return res.status(200).json(user);
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();
      const repository = getRepository(User);
      const { id } = req.params;
      const { email, password, name } = req.body;

      const emailExists = await repository.findOne({ where: { email } });

      if (emailExists && emailExists.email !== email) {
        await typeOrmConnection.close();
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

      await typeOrmConnection.close();

      return res.status(200).json(user);
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();
      const repository = getRepository(User);
      const { id } = req.params;
      const userExists = await repository.findOne(id);

      if (!userExists) {
        await typeOrmConnection.close();
        return res.status(404).send('Usuário não encontrado');
      }
      await repository.delete(id);

      await typeOrmConnection.close();

      return res.status(200).send('Usuário deletado com sucesso');
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }
}

export default new UserController();
