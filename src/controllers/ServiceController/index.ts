import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import connection from '../../database';
import Service from '../../database/entity/Service';

class ServiceController {
  async set(req: Request, res: Response) {
    try {
      await connection.create();
      const { scheduleDate, serviceDate, client, specialist, serviceState } = req.body;

      const service = new Service();

      Object.assign(service, { scheduleDate, serviceDate, client, specialist, serviceState });

      Object.entries(service).forEach(([key, value]) => {
        if (!value) throw new Error(`O campo ${key} é obrigatório`);
      });
      await connection.close();

      return res.send(200).end();
    } catch (error) {
      await connection.close();
      return res.send(400).json({
        error: true,
        message: error.message,
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      await connection.create();
      const clientsRepository = getRepository(Service);

      const clients = await clientsRepository.find({ relations: ['address', 'bloodtype'] });

      if (clients.length === 0) {
        return res.status(200).json([]);
      }

      await connection.close();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  }
}

export { ServiceController };
