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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../database/entity/User"));
const database_1 = __importDefault(require("../../database"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const repository = typeorm_1.getRepository(User_1.default);
                const { email, password } = req.body;
                const user = yield repository.findOne({ where: { email } });
                yield database_1.default.close();
                if (!user) {
                    return res.status(401).json({ error: true, message: 'Usuario não encontrado !!' });
                }
                // @ts-ignore
                const passwordIsValid = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordIsValid) {
                    return res.status(401).json({ error: true, message: 'Senha invalida !!' });
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, 'dotEnv', { expiresIn: '1d' });
                // @ts-ignore
                delete user.password;
                return res.status(200).json({ user, token });
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
}
exports.default = new LoginController();
