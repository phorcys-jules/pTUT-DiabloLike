import  { Character } from "./character/Character.js";
class User {
    name:string;
    password:string;
    constructor(name:string, password:string, chars:Character) {
        this.name =name;
        this.password = password;
    }
}