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
const Address_1 = __importDefault(require("../../database/entity/Address"));
const Specialist_1 = __importDefault(require("../../database/entity/Specialist"));
class SpecialistController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repositorySpecialist = typeorm_1.getRepository(Specialist_1.default);
                const specialtist = yield repositorySpecialist.find({ relations: ['specialties', 'address'] });
                return res.status(200).json(specialtist);
            }
            catch (error) {
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
    createSpecialist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repositorySpecialist = typeorm_1.getRepository(Specialist_1.default);
                const repositoryAddress = typeorm_1.getRepository(Address_1.default);
                const { name, email, registry, phone, cell, specialties, address } = req.body;
                const addressCreate = repositoryAddress.create(address);
                yield repositoryAddress.save(addressCreate);
                // @ts-ignore
                const address_id = yield repositoryAddress.findOne(addressCreate.id);
                const registryExists = yield repositorySpecialist.findOne({ where: { registry } });
                if (registryExists) {
                    return res.status(409).send('Registro já cadastrado');
                }
                const specialist = repositorySpecialist.create({
                    name,
                    email,
                    registry,
                    phone,
                    cell,
                    specialties,
                    address: address_id === null || address_id === void 0 ? void 0 : address_id.id,
                });
                yield repositorySpecialist.save(specialist);
                return res.status(200).json(specialist);
            }
            catch (error) {
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
    updateSpecialist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repositorySpecialist = typeorm_1.getRepository(Specialist_1.default);
                const repositoryAddress = typeorm_1.getRepository(Address_1.default);
                const data = req.body;
                const { id } = req.params;
                const specialist = yield repositorySpecialist.findOne(id);
                if (!specialist)
                    throw new Error('Especialista não encontrado.');
                Object.assign(specialist, Object.assign({}, data));
                yield repositorySpecialist.save(specialist);
                const address = yield repositoryAddress.findOne(data.address.id);
                yield Object.assign(address, Object.assign({}, data.address));
                // @ts-ignore
                yield repositoryAddress.save(address);
                return res.status(200).json(specialist);
            }
            catch (error) {
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
    deleteSpecialist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repositorySpecialist = typeorm_1.getRepository(Specialist_1.default);
                const { id } = req.params;
                const specialistExists = yield repositorySpecialist.findOne(id);
                if (!specialistExists) {
                    return res.status(404).send('Especialista não encontrado');
                }
                yield repositorySpecialist.delete(id);
                return res.status(200).send('Especialista deletado com sucesso');
            }
            catch (error) {
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
}
exports.default = new SpecialistController();
