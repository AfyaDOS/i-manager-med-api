"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsController = void 0;
const typeorm_1 = require("typeorm");
const Client_1 = __importDefault(require("../../database/entity/Client"));
const Address_1 = __importDefault(require("../../database/entity/Address"));
class ClientsController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsRepository = typeorm_1.getRepository(Client_1.default);
                let clients = yield clientsRepository
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
                if (clients.length === 0) {
                    return res.status(200).json([]);
                }
                clients = clients.map((client) => (Object.assign(Object.assign({}, client), { bloodtype: client.bloodtype.id })));
                return res.status(200).json(clients);
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
    set(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, cpf, email, phone, gender, cellphone, address: { city, state, street, district, numberOf, postcode }, bloodtype, } = req.body;
                const newAddress = new Address_1.default();
                Object.assign(newAddress, {
                    city,
                    state,
                    street,
                    district,
                    numberOf,
                    postcode,
                });
                Object.entries(newAddress).forEach(([key, value]) => {
                    if (!value)
                        throw new Error(`O campo ${key} é obrigatório !!`);
                });
                const { id } = yield newAddress.save();
                const client = new Client_1.default();
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
                    if (!value)
                        throw new Error(`O campo ${key} é obrigatório !!`);
                });
                yield client.save();
                return res.status(201).end();
            }
            catch (error) {
                if (error instanceof typeorm_1.QueryFailedError) {
                    return res.status(400).json({
                        error: true,
                        message: error.message,
                    });
                }
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const clientRepository = typeorm_1.getRepository(Client_1.default);
                const client = yield clientRepository.findOne(id);
                if (!client) {
                    throw new Error('Cliente não encontrado !!');
                }
                Object.assign(client, data);
                yield clientRepository.save(client);
                return res.status(201).end();
            }
            catch (error) {
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const clientsRepository = typeorm_1.getRepository(Client_1.default);
                const client = yield clientsRepository.findOne(id);
                yield (client === null || client === void 0 ? void 0 : client.remove());
                return res.status(200).end();
            }
            catch (error) {
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
}
exports.ClientsController = ClientsController;
