import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import MedRecord from '../../database/entity/MedRecord';

class MedRecordController {
  async set(req: Request, res: Response) {
    try {
      const { client, specialist, description } = req.body;

      const medRecord = new MedRecord();

      Object.assign(medRecord, { client, specialist, description });

      Object.entries(medRecord).forEach(([key, value]) => {
        if (!value) throw new Error(`O campo ${key} é obrigatório`);
      });

      await medRecord.save();

      return res.status(201).end();
    } catch (error) {
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  }

  async getByClient(req: Request, res: Response) {
    try {
      const medRecordRepository = getRepository(MedRecord);

      const { id } = req.params;

      const medRecords = await medRecordRepository.find({ where: { client: id }, relations: ['client', 'specialist'] });

      if (medRecords.length === 0) throw new Error('Nenhum prontuário cadastrado.');

      return res.status(200).json(medRecords);
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data = req.body;

      const { id } = req.params;

      const medRecordRepository = getRepository(MedRecord);

      const medRecordByClient = await medRecordRepository.findOne(id, { relations: ['client', 'specialist'] });

      if (!medRecordByClient) {
        return res.status(400).json({ error: true, message: 'Prontuário não encontrado.' });
      }

      Object.assign(medRecordByClient, data);

      await medRecordRepository.save(medRecordByClient);

      return res.status(200).end();
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const medRecordRepository = getRepository(MedRecord);
      const { id } = req.params;
      const medRecordExists = await medRecordRepository.findOne(id, { relations: ['client', 'specialist'] });

      if (!medRecordExists) {
        return res.status(404).send('Prontuário não encontrado');
      }
      await medRecordRepository.delete(id);

      return res.status(200).send('Prontuário deletado com sucesso');
    } catch (error) {
      return res.status(404).json({ error: true, message: error.message });
    }
  }
}

export { MedRecordController };
