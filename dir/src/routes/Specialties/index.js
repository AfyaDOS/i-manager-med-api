"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesSpecialties = void 0;
const express_1 = require("express");
const SpecialtiesController_1 = __importDefault(require("../../controllers/SpecialtiesController"));
const routesSpecialties = express_1.Router();
exports.routesSpecialties = routesSpecialties;
routesSpecialties.get('/', SpecialtiesController_1.default.index);
routesSpecialties.post('/', SpecialtiesController_1.default.createSpecialties);
routesSpecialties.put('/:id', SpecialtiesController_1.default.updateSpecialties);
routesSpecialties.delete('/:id', SpecialtiesController_1.default.deleteSpecialties);
