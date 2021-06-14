"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesStateService = void 0;
const express_1 = require("express");
const ServiceStateController_1 = require("../../controllers/ServiceStateController");
const routesStateService = express_1.Router();
exports.routesStateService = routesStateService;
const serviceStateControlle = new ServiceStateController_1.ServiceStateController();
routesStateService.get('/', serviceStateControlle.getAll);
