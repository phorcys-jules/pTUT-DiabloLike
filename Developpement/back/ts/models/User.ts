export class User {
    pseudo: string;
    firstname: string;
    lastname: string;
    password: string;
    email: string;

    constructor(pseudo: string, firstname: string, lastname: string, password: string, email: string) {
       /**
        * TODO verifier format données
        * (mail match avec xxx@mail.xxx)
        * password assez solide
        * ...
        * et renvoyer erreur en consèquence
        */
       
        this.pseudo = pseudo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
    }

    public sql_insert() : string {
        return `INSERT INTO user (pseudo, firstname, lastname, password, email)
                    VALUES ('${this.pseudo}', '${this.firstname}', '${this.lastname}', '${this.password}', '${this.email}');`;
    }
}