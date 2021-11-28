var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import pkg from 'typeorm';
//const { Entity, PrimaryGeneratedColumn, Column } = pkg;
import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";
//Entity : model
let User = class User {
    constructor(pseudo, firstname, lastname, password, email) {
        this.id = -1;
        this.pseudo = pseudo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "pseudo", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
User = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String, String, String, String, String])
], User);
export { User };
//# sourceMappingURL=User.js.map