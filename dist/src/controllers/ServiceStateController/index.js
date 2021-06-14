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
exports.ServiceStateController = void 0;
const typeorm_1 = require("typeorm");
const database_1 = __importDefault(require("../../database"));
const StateService_1 = __importDefault(require("../../database/entity/StateService"));
class ServiceStateController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const serviceStateController = typeorm_1.getRepository(StateService_1.default);
                const states = yield serviceStateController.find({ select: ['id', 'state'] });
                yield database_1.default.close();
                if (states.length === 0) {
                    return res.status(200).json([]);
                }
                return res.status(200).json(states);
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(400).json({ error: true, message: error.message });
            }
        });
    }
}
exports.ServiceStateController = ServiceStateController;
