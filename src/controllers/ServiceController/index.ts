import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import typeOrmConnection from '../../database';
import Service from '../../database/entity/Service';

class ServiceController {
  async set(req: Request, res: Response) {
    try {
      const data = req.body;

      await typeOrmConnection.create();

      const service = new Service();

      Object.assign(service, data);

      await service.save();

      await typeOrmConnection.close();

      return res.status(200).end();
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();

      const serviceRepository = getRepository(Service);

      const { date } = req.query;

      const clients = await serviceRepository
        .createQueryBuilder('service')
        .select([
          'service.id',
          'service.scheduleDate',
          'service.serviceDate',
        ])
        .innerJoin('service.serviceState', 'servicestate')
        .addSelect(['servicestate.id', 'servicestate.state'])
        .innerJoin('service.client', 'client')
        .addSelect([
          'client.id',
          'client.name',
          'client.cpf',
          'client.cellphone',
          'client.phone',
        ])
        .innerJoin('service.specialist', 'specialist')
        .addSelect([
          'specialist.id',
          'specialist.name',
        ])
        .innerJoin('specialist.specialties', 'specialties')
        .addSelect(['specialties.text'])
        .where(`to_char(service.scheduleDate, 'dd/mm/yyyy') like '%${date}%'`)
        .getMany();

      if (clients.length === 0) {
        await typeOrmConnection.close();
        return res.status(200).json([]);
      }

      await typeOrmConnection.close();

      return res.status(200).json(clients);
    } catch (error) {
      await typeOrmConnection.close();

      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();

      const data = req.body;
      const { id } = req.params;

      const serviceRespository = getRepository(Service);

      const service = await serviceRespository.findOne(id);

      if (!service) {
        await typeOrmConnection.close();

        return res.status(400).json({ error: true, message: 'Atendimento não encotrado' });
      }

      Object.assign(service, data);

      await serviceRespository.save(service);

      await typeOrmConnection.close();

      return res.status(200).end();
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  }
}

export { ServiceController };
