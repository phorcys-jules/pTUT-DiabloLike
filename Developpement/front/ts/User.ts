import { Character } from "./character/Character";

export class User {
    pseudo:string;
    lastname:string;
    firstname:string;
    email:string;
    password:string;
    static gold:number;

    chars : Character[];
    constructor(pseudo:string, firstname:string, lastname:string, password:string, email:string, gold:number = 0, chars:Character[]=[]) {
        this.pseudo = pseudo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        User.gold = gold;
        this.chars = chars;
        this.updateGold();
    }

    ajouterChar(char : Character) {
        this.chars.push(char);
    }

    updateGold(montant:number=0){
        User.gold += montant;
        try {
            const goldLabel = document.getElementById('userGold') as HTMLElement;
            goldLabel.innerHTML = User.gold.toString();
          } catch (error) {}
    }

    toString() {
        return `Nom : ${this.lastname} / Prenom : ${this.firstname} / Pseudo : ${this.pseudo} a ete créé`;
    }
}



