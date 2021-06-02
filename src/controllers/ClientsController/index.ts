import { Request, Response } from 'express';
import { getRepository, QueryFailedError } from 'typeorm';
import Client from '../../database/entity/Client';
import Address from '../../database/entity/Address';

class ClientsController {
  async set(req: Request, res: Response) {
    try {
      const {
        name,
        cpf,
        email,
        phone,
        address: { city, state, street, district, numberOf, postcode },
        bloodtype,
      } = req.body;

      const newAddress = new Address();

      Object.assign(newAddress, {
        city,
        state,
        street,
        district,
        numberOf,
        postcode,
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

      return res.status(201).end();
    } catch (error) {
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
      const clientsRepository = getRepository(Client);

      const clients = await clientsRepository.find({ relations: ['address', 'bloodtype'] });

      if (clients.length === 0) throw new Error('Nenhum cliente cadastrado.');

      return res.status(200).json(clients);
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data = req.body;

      const { id } = req.params;

      const clientRepository = getRepository(Client);
      const addressRepository = getRepository(Address);

      const client = await clientRepository.findOne(id, { relations: ['address'] });

      if (!client) {
        return res.status(400).json({ error: true, message: 'Cliente não encontrado.' });
      }

      const address = await addressRepository.findOne(client.address.id);

      if (!address) {
        return res.status(400).json({ error: true, message: 'Endereço não encontrado.' });
      }

      const newAddress = data.address;

      delete data.address;

      Object.assign(address, newAddress);

      Object.assign(client, data);

      await clientRepository.save(client);

      await addressRepository.save(address);

      return res.status(200).end();
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  }
}

export { ClientsController };
