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
exports.BloodTypeController = void 0;
const typeorm_1 = require("typeorm");
const BloodType_1 = __importDefault(require("../../database/entity/BloodType"));
class BloodTypeController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bloodTypeRepository = typeorm_1.getRepository(BloodType_1.default);
                const types = yield bloodTypeRepository.find();
                if (types.length === 0) {
                    throw new Error('Nenhum tipo sanguíneo cadastrado.');
                }
                return res.status(200).json(types);
            }
            catch (error) {
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
}
exports.BloodTypeController = BloodTypeController;
