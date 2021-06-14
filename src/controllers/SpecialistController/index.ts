import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import typeOrmConnection from '../../database';
import Address from '../../database/entity/Address';
import Specialist from '../../database/entity/Specialist';

class SpecialistController {
  async index(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();
      const repositorySpecialist = getRepository(Specialist);
      const specialtist = await repositorySpecialist.find({ relations: ['specialties', 'address'] });

      await typeOrmConnection.close();

      return res.status(200).json(specialtist);
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async createSpecialist(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();
      const repositorySpecialist = getRepository(Specialist);
      const repositoryAddress = getRepository(Address);
      const { name, email, registry, phone, cell, specialties, address } = req.body;
      const addressCreate = repositoryAddress.create(address);
      await repositoryAddress.save(addressCreate);
      // @ts-ignore
      const address_id = await repositoryAddress.findOne(addressCreate.id);
      const registryExists = await repositorySpecialist.findOne({ where: { registry } });

      if (registryExists) {
        await typeOrmConnection.close();
        return res.status(409).send('Registro já cadastrado');
      }

      const specialist = repositorySpecialist.create({
        name,
        email,
        registry,
        phone,
        cell,
        specialties,
        address: address_id?.id,
      });

      await repositorySpecialist.save(specialist);

      await typeOrmConnection.close();

      return res.status(200).json(specialist);
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async updateSpecialist(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();
      const repositorySpecialist = getRepository(Specialist);
      const repositoryAddress = getRepository(Address);
      const data = req.body;
      const { id } = req.params;

      const specialist = await repositorySpecialist.findOne(id);
      if (!specialist) throw new Error('Especialista não encontrado.');

      Object.assign(specialist, { ...data });
      await repositorySpecialist.save(specialist);

      const address = await repositoryAddress.findOne(data.address.id);
      await Object.assign(address, { ...data.address });
      // @ts-ignore
      await repositoryAddress.save(address);

      await typeOrmConnection.close();

      return res.status(200).json(specialist);
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }

  async deleteSpecialist(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();
      const repositorySpecialist = getRepository(Specialist);
      const { id } = req.params;
      const specialistExists = await repositorySpecialist.findOne(id);

      if (!specialistExists) {
        await typeOrmConnection.close();
        return res.status(404).send('Especialista não encontrado');
      }

      await repositorySpecialist.delete(id);

      await typeOrmConnection.close();

      return res.status(200).send('Especialista deletado com sucesso');
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }
}

export default new SpecialistController();
