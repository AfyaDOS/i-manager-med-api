import { Request, Response } from 'express';
import { getRepository, QueryFailedError } from 'typeorm';
import Client from '../../database/entity/Client';
import Address from '../../database/entity/Address';
import connection from '../../database';

class ClientsController {
  async getAll(req: Request, res: Response) {
    try {
      await connection.create();

      const clientsRepository = getRepository(Client);

      let clients = await clientsRepository
        .createQueryBuilder('client')
        .select([
          'client.name',
          'client.cpf',
          'client.email',
          'client.id',
          'client.phone',
          'client.cellphone',
          'client.gender',
        ])
        .innerJoin('client.address', 'address')
        .innerJoin('client.bloodtype', 'bloodtype')
        .addSelect([
          'address.id',
          'address.city',
          'address.state',
          'address.street',
          'address.district',
          'address.numberOf',
          'address.postcode',
        ])
        .addSelect(['bloodtype.id'])
        .getMany();

      await connection.close();

      if (clients.length === 0) {
        return res.status(200).json([]);
      }

      clients = clients.map((client) => ({
        ...client,
        bloodtype: client.bloodtype.id,
      })) as unknown as Client[];

      return res.status(200).json(clients);
    } catch (error) {
      console.log(error);
      await connection.close();
      return res.status(400).json({ error: true, message: error.message });
    }
  }

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
        gender,
        cellphone,
        address: id,
      });

      Object.entries(client).forEach(([key, value]) => {
        if (!value) throw new Error(`O campo ${key} é obrigatório !!`);
      });

      await client.save();

      await connection.close();

      return res.status(201).end();
    } catch (error) {
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

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      await connection.create();

      const clientRepository = getRepository(Client);

      const client = await clientRepository.findOne(id);

      if (!client) {
        throw new Error('Cliente não encontrado !!');
      }

      Object.assign(client, data);

      await clientRepository.save(client);

      await connection.close();

      return res.status(201).end();
    } catch (error) {
      return res.status(400).json({ error: true, message: error.message });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await connection.create();
      const clientsRepository = getRepository(Client);

      const client = await clientsRepository.findOne(id);

      await client?.remove();

      await connection.close();

      return res.status(200).end();
    } catch (error) {
      await connection.close();
      return res.status(400).json({ error: true, message: error.message });
    }
  }
}

export { ClientsController };
