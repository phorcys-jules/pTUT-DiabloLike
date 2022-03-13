import { Character } from "./character/Character";

export class User {
    pseudo: string;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    static gold: number;

    chars: Character[];
    constructor(pseudo: string, firstname: string, lastname: string, password: string, email: string, gold: number = 0, chars: Character[] = []) {
        this.pseudo = pseudo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        User.gold = gold;
        this.chars = chars;
        this.updateGold();
    }

    ajouterChar(char: Character) {
        this.chars.push(char);
    }

    updateGold(montant: number = 0) {
        User.gold += montant;
        try {
            const goldLabel = document.getElementById('userGold') as HTMLElement;
            goldLabel.innerHTML = User.gold.toString();
        } catch (error) { }
    }

    toString() {
        return `Nom : ${this.lastname} / Prenom : ${this.firstname} / Pseudo : ${this.pseudo} a ete créé`;
    }

    static async whoIsConnected() {
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        console.log("SET : ");
        
        let res = await fetch(`http://localhost:8752/session/set`, request);
        console.log(res);

        let data = await res.json();
        console.log(data);

        console.log("GET : ");

        res = await fetch(`http://localhost:8752/session/get`, request);
        console.log(res);

        data = await res.json();
        console.log(data);
    }






    /*
    //POST request with body equal on data in JSON format
    fetch(`http://localhost:8752/session/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    //.then((response) => response.json())
    .then(async (data) => {            
        data = await data.json();
        console.log(data)
      console.log('Success:', data);
      //console.log('Success:', data.text);
      //console.log('Success:', data.formData);
      //console.log('Success:', data.json());
    })
    //Then with the error genereted...
    .catch((error) => {
      console.error('Error:', error);
    });
};
 
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const res = await fetch(`http://localhost:8752/session/get`, request);
    console.log(res);
    
    const data = await res.json();
    console.log(data);
    */
}



