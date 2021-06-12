import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import connection from '../../database';
import BloodType from '../../database/entity/BloodType';

class BloodTypeController {
  async getAll(req: Request, res: Response) {
    try {
      await connection.create();
      const bloodTypeRepository = getRepository(BloodType);

      const types = await bloodTypeRepository.find();

      if (types.length === 0) {
        throw new Error('Nenhum tipo sanguíneo cadastrado.');
      }
      await connection.close();
      return res.status(200).json(types);
    } catch (error) {
      await connection.close();
      return res.status(400).json({ error: true, message: error.message });
    }
  }
}

export { BloodTypeController };
