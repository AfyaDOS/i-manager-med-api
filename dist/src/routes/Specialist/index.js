"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesSpecialist = void 0;
const express_1 = require("express");
const SpecialistController_1 = __importDefault(require("../../controllers/SpecialistController"));
const routesSpecialist = express_1.Router();
exports.routesSpecialist = routesSpecialist;
routesSpecialist.get('/', SpecialistController_1.default.index);
routesSpecialist.post('/', SpecialistController_1.default.createSpecialist);
routesSpecialist.put('/:id', SpecialistController_1.default.updateSpecialist);
routesSpecialist.delete('/:id', SpecialistController_1.default.deleteSpecialist);
