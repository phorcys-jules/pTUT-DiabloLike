//import pkg from 'typeorm';
//const { Entity, PrimaryGeneratedColumn, Column } = pkg;
import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";
//Entity : model

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pseudo: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    password: string;

    @Column()
    email: string;

    constructor(pseudo:string, firstname:string, lastname:string, password:string, email:string) {
        this.id = -1;
        this.pseudo = pseudo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
    }
}
