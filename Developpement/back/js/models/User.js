export class User {
    constructor(pseudo, firstname, lastname, password, email) {
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
    sql_insert() {
        return `INSERT INTO user (pseudo, firstname, lastname, password, email)
                    VALUES ('${this.pseudo}', '${this.firstname}', '${this.lastname}', '${this.password}', '${this.email}');`;
    }
}
