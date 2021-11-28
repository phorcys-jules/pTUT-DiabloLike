/*import "reflect-metadata";
import pkg from 'typeorm';
const { createConnection } = pkg;
*/

import {createConnection} from "typeorm";
import * as entity from "./entity/index.js";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new entity.User('jm','Jean','Michel','1234','jmTS@mail.fr')
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(entity.User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
