import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Specialties from '../../database/entity/Specialties';
import Specialist from '../../database/entity/Specialist';
import connection from '../../database';

class SpecialtiesController {
  async index(req: Request, res: Response) {
    try {
      await connection.create();
      const repositorySpecialties = getRepository(Specialties);
      const SpecialtiesExists = await repositorySpecialties.find({
        select: ['id', 'specialty', 'text'],
      });
      await connection.close();

      return res.status(200).json(SpecialtiesExists);
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async createSpecialties(req: Request, res: Response) {
    try {
      await connection.create();
      const repositorySpecialties = getRepository(Specialties);
      const repositorySpecialist = getRepository(Specialist);
      const { specialty } = req.body;
      const { idSpecialist } = req.body;

      const specialist = await repositorySpecialist.findOne(idSpecialist);

      const specialties = repositorySpecialties.create({
        specialty,
        text: specialty,
        specialist,
      });

      await repositorySpecialties.save(specialties);
      await connection.close();
      return res.status(200).json(specialties);
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async updateSpecialties(req: Request, res: Response) {
    try {
      await connection.create();
      const repositorySpecialties = getRepository(Specialties);
      const { specialty } = req.body;
      const { id } = req.params;

      const specialties = await repositorySpecialties.findOne(id);

      if (!specialties) {
        return res.status(404).send('Especialidade não encontrado');
      }

      // @ts-ignore
      specialties.specialty = specialty;
      specialties.text = specialty;

      // @ts-ignore
      await repositorySpecialties.save(specialties);
      await connection.close();
      return res.status(200).json(specialties);
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async deleteSpecialties(req: Request, res: Response) {
    try {
      await connection.create();
      const repositorySpecialties = getRepository(Specialties);
      const { id } = req.params;
      const specialtiesExists = await repositorySpecialties.findOne(id);

      if (!specialtiesExists) {
        return res.status(404).send('Especialidade não encontrado');
      }

      await repositorySpecialties.delete(id);
      await connection.close();
      return res.status(200).send('Especialidade deletada com sucesso');
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }
}

export default new SpecialtiesController();
