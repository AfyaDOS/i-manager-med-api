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
let defaultConnection;
const typeOrmConnection = {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionManager = typeorm_1.getConnectionManager();
                const connectionOptions = yield typeorm_1.getConnectionOptions(process.env.NODE_ENV);
                if (!connectionManager.has('default')) {
                    connectionManager.create(Object.assign(Object.assign({}, connectionOptions), { name: 'default' }));
                }
                return connectionManager.get().connect();
            }
            catch (error) {
                if (defaultConnection === null || defaultConnection === void 0 ? void 0 : defaultConnection.isConnected) {
                    yield defaultConnection.close();
                    defaultConnection = undefined;
                }
                throw new Error(error.message);
            }
        });
    },
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionManager = typeorm_1.getConnectionManager();
                if (connectionManager.has('default')) {
                    yield connectionManager.get().close();
                }
            }
            catch (error) {
                console.log(error);
                if (defaultConnection === null || defaultConnection === void 0 ? void 0 : defaultConnection.isConnected) {
                    yield defaultConnection.close();
                    defaultConnection = undefined;
                }
            }
        });
    },
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = typeorm_1.getConnection('default');
                const entities = connect.entityMetadatas;
                const promises = entities.map((entity) => __awaiter(this, void 0, void 0, function* () {
                    const repository = connect.getRepository(entity.name);
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
exports.default = typeOrmConnection;
