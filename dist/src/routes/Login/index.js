"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesLogin = void 0;
const express_1 = require("express");
const LoginController_1 = __importDefault(require("../../controllers/LoginController"));
const routesLogin = express_1.Router();
exports.routesLogin = routesLogin;
routesLogin.post('/', LoginController_1.default.login);
