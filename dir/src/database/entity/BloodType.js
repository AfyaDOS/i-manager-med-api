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
exports.EBlood = void 0;
const typeorm_1 = require("typeorm");
var EBlood;
(function (EBlood) {
    EBlood[EBlood["A+"] = 0] = "A+";
    EBlood[EBlood["A-"] = 1] = "A-";
    EBlood[EBlood["B+"] = 2] = "B+";
    EBlood[EBlood["B-"] = 3] = "B-";
    EBlood[EBlood["O+"] = 4] = "O+";
    EBlood[EBlood["O-"] = 5] = "O-";
    EBlood[EBlood["AB+"] = 6] = "AB+";
    EBlood[EBlood["AB-"] = 7] = "AB-";
})(EBlood = exports.EBlood || (exports.EBlood = {}));
let BloodType = class BloodType extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], BloodType.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: EBlood,
    }),
    __metadata("design:type", Number)
], BloodType.prototype, "typeOf", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], BloodType.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], BloodType.prototype, "updated_at", void 0);
BloodType = __decorate([
    typeorm_1.Entity('bloodtype')
], BloodType);
exports.default = BloodType;
