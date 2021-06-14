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
const User_1 = __importDefault(require("../../database/entity/User"));
const database_1 = __importDefault(require("../../database"));
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const repository = typeorm_1.getRepository(User_1.default);
                const userExists = yield repository.find();
                yield database_1.default.close();
                return res.status(200).json(userExists);
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const repository = typeorm_1.getRepository(User_1.default);
                const { email, password, name } = req.body;
                const passwordCrypt = bcrypt_1.default.hashSync(password, 8);
                const emailExists = yield repository.findOne({ where: { email } });
                if (emailExists) {
                    yield database_1.default.close();
                    return res.status(409).send('Email já cadastrado');
                }
                const user = repository.create({ name, email, password: passwordCrypt });
                yield repository.save(user);
                yield database_1.default.close();
                return res.status(200).json(user);
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const repository = typeorm_1.getRepository(User_1.default);
                const { id } = req.params;
                const { email, password, name } = req.body;
                const emailExists = yield repository.findOne({ where: { email } });
                if (emailExists && emailExists.email !== email) {
                    yield database_1.default.close();
                    return res.status(409).send('Email já cadastrado');
                }
                const user = yield repository.findOne(id);
                const passwordCrypt = bcrypt_1.default.hashSync(password, 8);
                // @ts-ignore
                user.name = name;
                // @ts-ignore
                user.email = email;
                // @ts-ignore
                user.password = passwordCrypt;
                // @ts-ignore
                yield repository.save(user);
                yield database_1.default.close();
                return res.status(200).json(user);
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.create();
                const repository = typeorm_1.getRepository(User_1.default);
                const { id } = req.params;
                const userExists = yield repository.findOne(id);
                if (!userExists) {
                    yield database_1.default.close();
                    return res.status(404).send('Usuário não encontrado');
                }
                yield repository.delete(id);
                yield database_1.default.close();
                return res.status(200).send('Usuário deletado com sucesso');
            }
            catch (error) {
                yield database_1.default.close();
                return res.status(404).json({ error: true, message: error.message });
            }
        });
    }
}
exports.default = new UserController();
