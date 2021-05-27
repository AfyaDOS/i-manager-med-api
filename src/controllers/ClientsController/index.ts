import {
  Request, Response,
} from 'express';
import {
  getRepository, QueryFailedError,
} from 'typeorm';
import Client from '../../database/entity/Client';
import Address from '../../database/entity/Address';

class ClientsController {
  async set(req: Request, res: Response) {
    try {
      const {
        name, cpf, email, phone, address,
      } = req.body;

      const clientRepository = getRepository(Client);
      const addressRepository = getRepository(Address);

      const newAddress = new Address();

      Object.assign(newAddress, {
        ...address,
      });

      Object.entries(newAddress).forEach(([key, value]) => {
        if (!value) throw new Error(`O campo ${key} é obrigatório !!`);
      });

      const {
        id,
      } = await addressRepository.save(newAddress);

      const client = new Client();

      Object.assign(client, {
        name,
        cpf,
        email,
        phone,
        address: id,
      });

      Object.entries(client).forEach(([key, value]) => {
        if (!value) throw new Error(`O campo ${key} é obrigatório !!`);
      });

      await clientRepository.save(client);

      return res.status(200).end();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        return res.status(400).json({
          error: true,
          message: error.detail,
        });
      }

      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }
  }
}

export {
  ClientsController,
};
