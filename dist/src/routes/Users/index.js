"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesUsers = void 0;
const express_1 = require("express");
const UsersController_1 = __importDefault(require("../../controllers/UsersController"));
const routesUsers = express_1.Router();
exports.routesUsers = routesUsers;
routesUsers.get('/', UsersController_1.default.index);
routesUsers.post('/', UsersController_1.default.createUser);
routesUsers.delete('/:id', UsersController_1.default.deleteUser);
routesUsers.put('/:id', UsersController_1.default.updateUser);
