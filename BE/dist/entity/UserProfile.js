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
exports.UserProfile = void 0;
const typeorm_1 = require("typeorm");
const Infor_1 = require("./Infor");
let UserProfile = class UserProfile extends Infor_1.Infor {
};
exports.UserProfile = UserProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("char", { length: 30, nullable: false }),
    __metadata("design:type", String)
], UserProfile.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("char", { length: 30, nullable: false }),
    __metadata("design:type", String)
], UserProfile.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)("char", { length: 11, nullable: false }),
    __metadata("design:type", String)
], UserProfile.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 150, nullable: false }),
    __metadata("design:type", String)
], UserProfile.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { length: 255, nullable: false }),
    __metadata("design:type", String)
], UserProfile.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", width: 10000, default: 0 }),
    __metadata("design:type", Number)
], UserProfile.prototype, "coins", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, typeorm_1.Entity)()
], UserProfile);
