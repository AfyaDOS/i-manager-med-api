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
const Service_1 = __importDefault(require("../../database/entity/Service"));
class ServiceController {
    set(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { scheduleDate, serviceDate, client, specialist, serviceState } = req.body;
                const service = new Service_1.default();
                Object.assign(service, { scheduleDate, serviceDate, client, specialist, serviceState });
                Object.entries(service).forEach(([key, value]) => {
                    if (!value)
                        throw new Error(`O campo ${key} é obrigatório`);
                });
                yield service.save();
                return res.status(201).end();
            }
            catch (error) {
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
                const serviceRepository = typeorm_1.getRepository(Service_1.default);
                const services = yield serviceRepository.find({ relations: ['client', 'specialist'] });
                if (services.length === 0)
                    throw new Error('Nenhum service cadastrado.');
                return res.status(200).json(services);
            }
            catch (error) {
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
}
exports.ServiceController = ServiceController;
