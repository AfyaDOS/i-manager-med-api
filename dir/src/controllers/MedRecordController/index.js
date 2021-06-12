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
exports.MedRecordController = void 0;
const typeorm_1 = require("typeorm");
const MedRecord_1 = __importDefault(require("../../database/entity/MedRecord"));
class MedRecordController {
    set(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { client, specialist, description } = req.body;
                const medRecord = new MedRecord_1.default();
                Object.assign(medRecord, { client, specialist, description });
                Object.entries(medRecord).forEach(([key, value]) => {
                    if (!value)
                        throw new Error(`O campo ${key} é obrigatório`);
                });
                yield medRecord.save();
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
    getByClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const medRecordRepository = typeorm_1.getRepository(MedRecord_1.default);
                const { id } = req.params;
                const medRecords = yield medRecordRepository.find({ where: { client: id }, relations: ['client', 'specialist'] });
                if (medRecords.length === 0)
                    throw new Error('Nenhum prontuário cadastrado.');
                return res.status(200).json(medRecords);
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
                const medRecordRepository = typeorm_1.getRepository(MedRecord_1.default);
                const medRecordByClient = yield medRecordRepository.findOne(id, { relations: ['client', 'specialist'] });
                if (!medRecordByClient) {
                    return res.status(400).json({ error: true, message: 'Prontuário não encontrado.' });
                }
                Object.assign(medRecordByClient, data);
                yield medRecordRepository.save(medRecordByClient);
                return res.status(200).end();
            }
            catch (error) {
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const medRecordRepository = typeorm_1.getRepository(MedRecord_1.default);
                const { id } = req.params;
                const medRecordExists = yield medRecordRepository.findOne(id, { relations: ['client', 'specialist'] });
                if (!medRecordExists) {
                    return res.status(404).send('Prontuário não encontrado');
                }
                yield medRecordRepository.delete(id);
                return res.status(200).send('Prontuário deletado com sucesso');
            }
            catch (error) {
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
}
exports.MedRecordController = MedRecordController;
