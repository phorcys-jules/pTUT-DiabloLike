import { Character } from "./character/Character.js";
import { Wizard } from "./character/Wizard.js";
import { Warrior } from "./character/Warrior.js";
import { Archer } from "./character/Archer.js";

import { bootstrap } from "./engine/bootstrap.js";
import { Zombie } from "./character/Zombie.js";
import Game from "./engine/Game.js";
import { User } from "./User.js";


const form: HTMLFormElement = document.getElementById('formChar') as HTMLFormElement;
console.log(Game.player);





 function getClassId (n: string){
    const data = {};

    //POST request with body equal on data in JSON format
    fetch(`http://localhost:8752/classbyname/${n}`, {
      method: 'GET',
    })
    .then((response) => console.log(response.blob()))
    //Then with the data from the response in JSON...
    .then((data) => {
      console.log('Success:', data);
      window.location.href = '../../index.html';
    })
    //Then with the error genereted...
    .catch((error) => {
      console.error('Error:', error);
    });
};


async function validate(name:String, classID:number){
    const data={};
    //POST request with body equal on data in JSON format
    fetch(`http://localhost:8752/createChar/${name}/${classID}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    //Then with the data from the response in JSON...
    .then((data) => {
      console.log('Success:', data);
      //window.location.href = './createChar.html';
    })
    //Then with the error genereted...
    .catch((error) => {
      console.error('Error:', error);
    });
};



form.onsubmit = () => {
  console.log('form submit');
  
    const formData = new FormData(form);

    const characterName = formData.get('name') as string;
    const characterClass = formData.get('class') as string;
    let c1:Character;
    

    switch (characterClass) {
        case 'Sorcier':
            c1 = new Wizard(characterName);
            validate(characterName,2);
            break;
        case 'Guerrier':
            c1 = new Warrior(characterName);
            validate(characterName,3);
            break;
        case 'Archer':
            c1 = new Archer(characterName);
            validate(characterName,1);
            break;

        default:
            throw new Error("La classe "+characterClass+"n'est pas défini");
            break;
    }
    console.log(c1.toString());
    console.log('Character created !')
    
    //tmp TODO remove tha tmp create user
    let u:User = new User('userPseudo','userFirstName', 'userLastName', 'userPassword', 'userEmail');
    Game.player = u;


    Game.player.ajouterChar(c1);
    console.log("game player char : ", Game.player.chars)
    window.location.href = '../index.html';

    //bootstrap(Game.player, [new Zombie(), new Zombie()]);

    return false; // prevent reload
};

