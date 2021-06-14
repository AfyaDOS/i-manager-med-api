import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import typeOrmConnection from '../../database';
import ServiceState from '../../database/entity/StateService';

class ServiceStateController {
  async getAll(req: Request, res: Response) {
    try {
      await typeOrmConnection.create();

      const serviceStateController = getRepository(ServiceState);

      const states = await serviceStateController.find({ select: ['id', 'state'] });

      await typeOrmConnection.close();

      if (states.length === 0) {
        return res.status(200).json([]);
      }

      return res.status(200).json(states);
    } catch (error) {
      await typeOrmConnection.close();
      return res.status(400).json({ error: true, message: error.message });
    }
  }
}
export { ServiceStateController };
