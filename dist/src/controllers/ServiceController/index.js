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
exports.ServiceController = void 0;
const typeorm_1 = require("typeorm");
const database_1 = __importDefault(require("../../database"));
const Service_1 = __importDefault(require("../../database/entity/Service"));
class ServiceController {
    set(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                yield database_1.default.create();
                const service = new Service_1.default();
                Object.assign(service, data);
                yield service.save();
                yield database_1.default.close();
                return res.status(200).end();
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(400).json({
                    error: true,
                    message: error.message,
                });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const serviceRepository = typeorm_1.getRepository(Service_1.default);
                const { date } = req.query;
                const clients = yield serviceRepository
                    .createQueryBuilder('service')
                    .select([
                    'service.id',
                    'service.scheduleDate',
                    'service.serviceDate',
                    'service.price',
                ])
                    .innerJoin('service.serviceState', 'servicestate')
                    .addSelect(['servicestate.id', 'servicestate.state'])
                    .innerJoin('service.client', 'client')
                    .addSelect([
                    'client.id',
                    'client.name',
                    'client.cpf',
                    'client.cellphone',
                    'client.phone',
                ])
                    .innerJoin('service.specialist', 'specialist')
                    .addSelect([
                    'specialist.id',
                    'specialist.name',
                ])
                    .innerJoin('specialist.specialties', 'specialties')
                    .addSelect(['specialties.text'])
                    .where(`to_char(service.scheduleDate, 'dd/mm/yyyy') like '%${date}%'`)
                    .getMany();
                if (clients.length === 0) {
                    yield database_1.default.close();
                    return res.status(200).json([]);
                }
                yield database_1.default.close();
                return res.status(200).json(clients);
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const data = req.body;
                const { id } = req.params;
                const serviceRespository = typeorm_1.getRepository(Service_1.default);
                const service = yield serviceRespository.findOne(id);
                if (!service) {
                    yield database_1.default.close();
                    return res.status(400).json({ error: true, message: 'Atendimento não encotrado' });
                }
                Object.assign(service, data);
                yield serviceRespository.save(service);
                yield database_1.default.close();
                return res.status(200).end();
            }
            catch (error) {
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
}
exports.ServiceController = ServiceController;
