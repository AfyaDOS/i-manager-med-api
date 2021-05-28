import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Specialties from '../../database/entity/Specialties';
import Specialist from '../../database/entity/Specialist';

class SpecialtiesController {
  async index(req: Request, res: Response) {
    try {
      const repositorySpecialties = getRepository(Specialties);
      const { idSpecialist } = req.params;

      const SpecialtiesExists = await repositorySpecialties.find({
        relations: ['specialist'],
        where: {
          specialist: {
            id: idSpecialist,
          },
        },
      });

      return res.status(200).json(SpecialtiesExists);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async createSpecialties(req: Request, res: Response) {
    try {
      const repositorySpecialties = getRepository(Specialties);
      const repositorySpecialist = getRepository(Specialist);
      const { specialty } = req.body;
      const { idSpecialist } = req.params;

      const specialist = await repositorySpecialist.findOne(idSpecialist);

      const specialties = repositorySpecialties.create({
        specialty,
        specialist,
      });

      await repositorySpecialties.save(specialties);

      return res.status(200).json(specialties);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async updateSpecialties(req: Request, res: Response) {
    try {
      const repositorySpecialties = getRepository(Specialties);
      const { specialty } = req.body;
      const { id } = req.params;

      const specialties = await repositorySpecialties.findOne(id);

      if (!specialties) {
        return res.status(404).send('Especialidade não encontrado');
      }

      // @ts-ignore
      specialties.specialty = specialty;

      // @ts-ignore
      await repositorySpecialties.save(specialties);

      return res.status(200).json(specialties);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  async deleteSpecialties(req: Request, res: Response) {
    try {
      const repositorySpecialties = getRepository(Specialties);
      const { id } = req.params;
      const specialtiesExists = await repositorySpecialties.findOne(id);

      if (!specialtiesExists) {
        return res.status(404).send('Especialidade não encontrado');
      }

      await repositorySpecialties.delete(id);

      return res.status(200).send('Especialidade deletada com sucesso');
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}

export default new SpecialtiesController();
