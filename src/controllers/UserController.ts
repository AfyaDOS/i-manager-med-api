import {
  Request, Response,
} from 'express';
import {
  getRepository,
} from 'typeorm';
import bcrypt from 'bcrypt';

import User from '../database/entity/User';

class UserController {
  async index(req: Request, res: Response) {
    const repository = getRepository(User);

    const userExists = await repository.find();

    // return res.send({ userId: req.userId })
    return res.status(200).json(userExists);
  }

  async createUser(req: Request, res: Response) {
    const repository = getRepository(User);
    const {
      email, password, name,
    } = req.body;

    const passwordCrypt = bcrypt.hashSync(password, 8);

    const userExists = await repository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(409).send('Email já cadastrado');
    }

    const user = repository.create({
      name, email, password: passwordCrypt,
    });

    await repository.save(user);

    return res.json(user);
  }

  async updateUser(req: Request, res: Response) {
    const repository = getRepository(User);
    const {
      id,
    } = req.params;

    const userExists = await repository.findOne({
      where: {
        id,
      },
    });

    if (userExists) {
      return res.status(404).send('Usuário não encontrado');
    }

    // userExists.name = name;

    // await userExists.save(user);
  }

  async deleteUser(req: Request, res: Response) {
    const repository = getRepository(User);
    const {
      id,
    } = req.params;

    const userExists = await repository.findOne({
      where: {
        id,
      },
    });

    if (!userExists) {
      return res.status(404).send('Usuário não encontrado');
    }

    await repository.delete(id);

    return res.status(200).send('Usuário deletado com sucesso');
  }
}

export default new UserController();
