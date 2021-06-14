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
const typeorm_1 = require("typeorm");
const Specialties_1 = __importDefault(require("../../database/entity/Specialties"));
const Specialist_1 = __importDefault(require("../../database/entity/Specialist"));
const database_1 = __importDefault(require("../../database"));
class SpecialtiesController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const repositorySpecialties = typeorm_1.getRepository(Specialties_1.default);
                const SpecialtiesExists = yield repositorySpecialties.find({ select: ['id', 'specialty', 'text'] });
                yield database_1.default.close();
                return res.status(200).json(SpecialtiesExists);
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
    createSpecialties(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const repositorySpecialties = typeorm_1.getRepository(Specialties_1.default);
                const repositorySpecialist = typeorm_1.getRepository(Specialist_1.default);
                const { specialty } = req.body;
                const { idSpecialist } = req.body;
                const specialist = yield repositorySpecialist.findOne(idSpecialist);
                const specialties = repositorySpecialties.create({
                    specialty,
                    text: specialty,
                    specialist,
                });
                yield repositorySpecialties.save(specialties);
                yield database_1.default.close();
                return res.status(200).json(specialties);
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
    updateSpecialties(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const repositorySpecialties = typeorm_1.getRepository(Specialties_1.default);
                const { specialty } = req.body;
                const { id } = req.params;
                const specialties = yield repositorySpecialties.findOne(id);
                if (!specialties) {
                    yield database_1.default.close();
                    return res.status(404).send('Especialidade não encontrado');
                }
                // @ts-ignore
                specialties.specialty = specialty;
                specialties.text = specialty;
                // @ts-ignore
                yield repositorySpecialties.save(specialties);
                yield database_1.default.close();
                return res.status(200).json(specialties);
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
    deleteSpecialties(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const repositorySpecialties = typeorm_1.getRepository(Specialties_1.default);
                const { id } = req.params;
                const specialtiesExists = yield repositorySpecialties.findOne(id);
                if (!specialtiesExists) {
                    yield database_1.default.close();
                    return res.status(404).send('Especialidade não encontrado');
                }
                yield repositorySpecialties.delete(id);
                yield database_1.default.close();
                return res.status(200).send('Especialidade deletada com sucesso');
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
}
exports.default = new SpecialtiesController();
