"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./database/index");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const swagger_1 = __importDefault(require("../swagger"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use(routes_1.routes);
exports.default = app;
