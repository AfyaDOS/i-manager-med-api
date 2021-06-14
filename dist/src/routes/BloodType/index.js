"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesBloodType = void 0;
const express_1 = require("express");
const BloodTypeController_1 = require("../../controllers/BloodTypeController");
const routesBloodType = express_1.Router();
exports.routesBloodType = routesBloodType;
const bloodTypeControlle = new BloodTypeController_1.BloodTypeController();
routesBloodType.get('/all', bloodTypeControlle.getAll);
