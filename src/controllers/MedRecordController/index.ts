import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import connection from '../../database';
import MedRecord from '../../database/entity/MedRecord';

class MedRecordController {
  async set(req: Request, res: Response) {
    try {
      await connection.create();

      const { client, specialist, description } = req.body;

      const medRecord = new MedRecord();

      Object.assign(medRecord, { client, specialist, description });

      Object.entries(medRecord).forEach(([key, value]) => {
        if (!value) throw new Error(`O campo ${key} é obrigatório`);
      });

      await medRecord.save();
      await connection.close();

      return res.status(201).end();
    } catch (error) {
      await connection.close();
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  }

  async getByClient(req: Request, res: Response) {
    try {
      await connection.create();

      const medRecordRepository = getRepository(MedRecord);

      const { id } = req.params;

      const medRecords = await medRecordRepository.find({ where: { client: id }, relations: ['client', 'specialist'] });

      if (medRecords.length === 0) {
        res.status(200).json([]);
      }

      await connection.close();

      return res.status(200).json(medRecords);
    } catch (error) {
      await connection.close();
      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      await connection.create();

      const data = req.body;

      const { id } = req.params;

      const medRecordRepository = getRepository(MedRecord);

      const medRecordByClient = await medRecordRepository.findOne(id, { relations: ['client', 'specialist'] });

      if (!medRecordByClient) {
        return res.status(400).json({ error: true, message: 'Prontuário não encontrado.' });
      }

      Object.assign(medRecordByClient, data);

      await medRecordRepository.save(medRecordByClient);

      await connection.close();

      return res.status(200).end();
    } catch (error) {
      await connection.close();
      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await connection.create();

      const medRecordRepository = getRepository(MedRecord);
      const { id } = req.params;
      const medRecordExists = await medRecordRepository.findOne(id, { relations: ['client', 'specialist'] });

      if (!medRecordExists) {
        return res.status(404).send('Prontuário não encontrado');
      }
      await medRecordRepository.delete(id);

      await connection.close();

      return res.status(200).send('Prontuário deletado com sucesso');
    } catch (error) {
      await connection.close();
      return res.status(404).json({ error: true, message: error.message });
    }
  }
}

export { MedRecordController };
