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
    set(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, cpf, email, phone, address: { city, state, street, district, numberOf, postcode }, bloodtype, } = req.body;
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
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientsRepository = typeorm_1.getRepository(Client_1.default);
                const clients = yield clientsRepository.find({ relations: ['address', 'bloodtype'] });
                if (clients.length === 0)
                    throw new Error('Nenhum cliente cadastrado.');
                return res.status(200).json(clients);
            }
            catch (error) {
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { id } = req.params;
                const clientRepository = typeorm_1.getRepository(Client_1.default);
                const addressRepository = typeorm_1.getRepository(Address_1.default);
                const client = yield clientRepository.findOne(id, { relations: ['address'] });
                if (!client) {
                    return res.status(400).json({ error: true, message: 'Cliente não encontrado.' });
                }
                const address = yield addressRepository.findOne(client.address.id);
                if (!address) {
                    return res.status(400).json({ error: true, message: 'Endereço não encontrado.' });
                }
                const newAddress = data.address;
                delete data.address;
                Object.assign(address, newAddress);
                Object.assign(client, data);
                yield clientRepository.save(client);
                yield addressRepository.save(address);
                return res.status(200).end();
            }
            catch (error) {
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
}
exports.ClientsController = ClientsController;
