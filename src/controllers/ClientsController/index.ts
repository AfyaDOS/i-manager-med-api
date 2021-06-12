import { Request, Response } from 'express';
import { getRepository, QueryFailedError } from 'typeorm';
import Client from '../../database/entity/Client';
import Address from '../../database/entity/Address';
import connection from '../../database';

class ClientsController {
  async set(req: Request, res: Response) {
    try {
      const {
        name,
        cpf,
        email,
        phone,
        gender,
        cellphone,
        address: { city, state, street, district, numberOf, postcode },
        bloodtype,
      } = req.body;

      await connection.create();

      const newAddress = new Address();

      Object.assign(newAddress, {
        city,
        state,
        street,
        district,
        numberOf,
        postcode,
        gender,
        cellphone,
      });

      Object.entries(newAddress).forEach(([key, value]) => {
        if (!value) throw new Error(`O campo ${key} é obrigatório !!`);
      });

      const { id } = await newAddress.save();

      const client = new Client();

      Object.assign(client, {
        name,
        cpf,
        email,
        phone,
        bloodtype,
        address: id,
      });

      Object.entries(client).forEach(([key, value]) => {
        if (!value) throw new Error(`O campo ${key} é obrigatório !!`);
      });

      await client.save();

      await connection.close();

      return res.status(201).end();
    } catch (error) {
      console.log(error);
      await connection.close();
      if (error instanceof QueryFailedError) {
        return res.status(400).json({
          error: true,
          message: error.message,
        });
      }

      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      await connection.create();

      const clientsRepository = getRepository(Client);

      const clients = await clientsRepository.find({ relations: ['address', 'bloodtype'] });

      await connection.close();

      if (clients.length === 0) throw new Error('Nenhum cliente cadastrado.');

      return res.status(200).json(clients);
    } catch (error) {
      await connection.close();
      return res.status(400).json({ error: true, message: error.message });
    }
  }
}

export { ClientsController };
