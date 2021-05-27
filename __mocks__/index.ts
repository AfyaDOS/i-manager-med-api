import {
  uuid,
} from 'uuidv4';
import Client from '../src/database/entity/Client';

export const MockClient: Client = {
  id: uuid(),
  cpf: 99999999999,
  name: 'string',
  phone: 14999999999,
  email: 'string',
  address: {
    id: uuid(),
    city: 'Ribeirão Preto',
    state: 'SP',
    street: 'Rua AA',
    district: 'Centro',
    numberOf: 999,
    postcode: 99999999,
  },
};
