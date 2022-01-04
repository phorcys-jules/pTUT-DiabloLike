import { Character } from "./character/Character.js";
import { Sorcier } from "./character/Sorcier.js";
import { Guerrier } from "./character/Guerrier.js";
import { Archer } from "./character/Archer.js";


const form: HTMLFormElement = document.getElementById('formChar') as HTMLFormElement;


form.onsubmit = () => {
    const formData = new FormData(form);

    const characterName = formData.get('name') as string;
    const characterClass = formData.get('class') as string;
    let c1:Character;
    

    switch (characterClass) {
        case 'Sorcier':
            c1 = new Sorcier(characterName);
            break;
        case 'Guerrier':
            c1 = new Guerrier(characterName);
            break;
        case 'Archer':
            c1 = new Archer(characterName);
            break;

        default:
            throw new Error("La classe "+characterClass+"n'est pas défini");
            break;
    }
    console.log(c1.toString());

    window.location.href = '../index.html';
    return false; // prevent reload
};

