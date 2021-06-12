"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EState = void 0;
const typeorm_1 = require("typeorm");
var EState;
(function (EState) {
    EState[EState["AGENDADO"] = 0] = "AGENDADO";
    EState[EState["REALIZADO"] = 1] = "REALIZADO";
    EState[EState["CANCELADO"] = 2] = "CANCELADO";
})(EState = exports.EState || (exports.EState = {}));
let ServiceState = class ServiceState extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ServiceState.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: EState,
    }),
    __metadata("design:type", Number)
], ServiceState.prototype, "state", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ServiceState.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], ServiceState.prototype, "updated_at", void 0);
ServiceState = __decorate([
    typeorm_1.Entity('servicestate')
], ServiceState);
exports.default = ServiceState;
