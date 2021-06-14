import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import BloodType from '../../database/entity/BloodType';

class BloodTypeController {
  async getAll(req: Request, res: Response) {
    try {
      const bloodTypeRepository = getRepository(BloodType);

      const types = await bloodTypeRepository.find();

      if (types.length === 0) {
        throw new Error('Nenhum tipo sanguíneo cadastrado.');
      }
      return res.status(200).json(types);
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  }
}

export { BloodTypeController };
