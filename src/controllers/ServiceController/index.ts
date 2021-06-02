import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Service from '../../database/entity/Service';

class ServiceController {
  async set(req: Request, res: Response) {
    try {
      const { scheduleDate, serviceDate, client, specialist, serviceState } = req.body;

      const service = new Service();

      Object.assign(service, { scheduleDate, serviceDate, client, specialist, serviceState });

      Object.entries(service).forEach(([key, value]) => {
        if (!value) throw new Error(`O campo ${key} é obrigatório`);
      });

      await service.save();

      return res.status(201).end();
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const serviceRepository = getRepository(Service);

      const services = await serviceRepository.find({ relations: ['client', 'specialist'] });

      if (services.length === 0) throw new Error('Nenhum service cadastrado.');

      return res.status(200).json(services);
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  }
}

export { ServiceController };
