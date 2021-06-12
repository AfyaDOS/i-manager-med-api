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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const connection = {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionOptions = yield typeorm_1.getConnectionOptions(process.env.NODE_ENV);
            return typeorm_1.createConnection(Object.assign(Object.assign({}, connectionOptions), { name: 'default' }));
        });
    },
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getConnection().close();
        });
    },
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection2 = typeorm_1.getConnection('default');
                const entities = connection2.entityMetadatas;
                const promises = entities.map((entity) => __awaiter(this, void 0, void 0, function* () {
                    const repository = connection2.getRepository(entity.name);
                    return repository.query(`DELETE FROM ${entity.tableName}`);
                }));
                return Promise.all(promises);
            }
            catch (error) {
                throw new Error('Erro ao limpar as tabelas');
            }
        });
    },
};
exports.default = connection;
connection.create();
