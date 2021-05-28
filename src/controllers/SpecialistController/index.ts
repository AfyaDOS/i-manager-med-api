import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Specialist from '../../database/entity/Specialist';
import User from '../../database/entity/User';

class SpecialistController {
  async index(req: Request, res: Response) {
    try {
      const repositorySpecialist = getRepository(Specialist);
      const specialistExists = await repositorySpecialist.find({
        relations: ['user'],
        where: {
          user: {
            id: req.userId,
          },
        },
      });

      return res.status(200).json(specialistExists);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async createSpecialist(req: Request, res: Response) {
    try {
      const repositorySpecialist = getRepository(Specialist);
      const repositoryUser = getRepository(User);
      const { name, email, registry, phone, cell } = req.body;

      const registryExists = await repositorySpecialist.findOne({
        where: { registry },
      });
      const user = await repositoryUser.findOne(req.userId);

      if (registryExists) {
        return res.status(409).send('Registro já cadastrado');
      }
      // @ts-ignore
      delete user.password;

      const specialist = repositorySpecialist.create({
        name,
        email,
        registry,
        phone,
        cell,
        user,
      });

      await repositorySpecialist.save(specialist);

      return res.status(200).json(specialist);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async updateSpecialist(req: Request, res: Response) {
    try {
      const repositorySpecialist = getRepository(Specialist);
      const { name, email, registry, phone, cell } = req.body;
      const { id } = req.params;

      const specialist = await repositorySpecialist.findOne(id);

      const registryExists = await repositorySpecialist.findOne({
        where: { registry },
      });

      if (registryExists) {
        return res.status(409).send('Registro já cadastrado');
      }

      // @ts-ignore
      specialist.name = name;
      // @ts-ignore
      specialist.email = email;
      // @ts-ignore
      specialist.registry = registry;
      // @ts-ignore
      specialist.phone = phone;
      // @ts-ignore
      specialist.cell = cell;

      // @ts-ignore
      await repositorySpecialist.save(specialist);

      return res.status(200).json(specialist);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async deleteSpecialist(req: Request, res: Response) {
    try {
      const repositorySpecialist = getRepository(Specialist);
      const { id } = req.params;
      const specialistExists = await repositorySpecialist.findOne(id);

      if (!specialistExists) {
        return res.status(404).send('Especialista não encontrado');
      }

      await repositorySpecialist.delete(id);

      return res.status(200).send('Especialista deletado com sucesso');
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}

export default new SpecialistController();
