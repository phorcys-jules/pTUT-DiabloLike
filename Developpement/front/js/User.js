export class User {
    constructor(pseudo, firstname, lastname, password, email) {

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

