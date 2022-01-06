import { Character } from "./character/Character.js";
import { Wizard } from "./character/Wizard.js";
import { Warrior } from "./character/Warrior.js";
import { Archer } from "./character/Archer.js";

import { bootstrap } from "./engine/bootstrap.js";
import { Zombie } from "./character/Zombie.js";


const form: HTMLFormElement = document.getElementById('formChar') as HTMLFormElement;


form.onsubmit = () => {
    const formData = new FormData(form);

    const characterName = formData.get('name') as string;
    const characterClass = formData.get('class') as string;
    let c1:Character;
    

    switch (characterClass) {
        case 'Wizard':
            c1 = new Wizard(characterName);
            break;
        case 'Warrior':
            c1 = new Warrior(characterName);
            break;
        case 'Archer':
            c1 = new Archer(characterName);
            break;

        default:
            throw new Error("La classe "+characterClass+"n'est pas défini");
            break;
    }
    console.log(c1.toString());

    bootstrap(c1, [new Zombie(), new Zombie()]);

    window.location.href = '../index.html';
    return false; // prevent reload
};

