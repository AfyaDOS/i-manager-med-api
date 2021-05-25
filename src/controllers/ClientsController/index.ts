import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Client from '../../database/entity/Client';

class ClientsController {
  async set(req: Request, res: Response) {
    try {
      const { name, cpf, email, phone, address } = req.body;
      const clientRepository = getRepository(Client);

      const client = new Client();

      clientRepository.save();

      res.send('Clients');
    } catch (error) {
      console.log(error);
    }
  }
}

export { ClientsController };
