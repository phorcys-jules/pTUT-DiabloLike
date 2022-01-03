export class User {
    pseudo:string;
    lastname:string;
    firstname:string;
    email:string;
    password:string;
    constructor(pseudo:string,firstname:string, lastname:string, password:string, email:string) {
        this.pseudo = pseudo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
    }

    toString() {
        return `Nom : ${this.lastname} / Prenom : ${this.firstname} / Pseudo : ${this.pseudo} a ete créé`;
    }
}



