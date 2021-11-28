/*import "reflect-metadata";
import pkg from 'typeorm';
const { createConnection } = pkg;
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createConnection } from "typeorm";
import * as entity from "./entity/index.js";
createConnection().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inserting a new user into the database...");
    const user = new entity.User('jm', 'Jean', 'Michel', '1234', 'jmTS@mail.fr');
    yield connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
    console.log("Loading users from the database...");
    const users = yield connection.manager.find(entity.User);
    console.log("Loaded users: ", users);
    console.log("Here you can setup and run express/koa/any other framework.");
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map