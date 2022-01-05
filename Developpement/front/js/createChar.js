import { Sorcier } from "./character/Sorcier.js";
import { Guerrier } from "./character/Guerrier.js";
import { Archer } from "./character/Archer.js";
import { bootstrap } from "./engine/bootstrap.js";
const form = document.getElementById('formChar');
form.onsubmit = () => {
    const formData = new FormData(form);
    const characterName = formData.get('name');
    const characterClass = formData.get('class');
    let c1;
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
            throw new Error("La classe " + characterClass + "n'est pas défini");
            break;
    }
    console.log(c1.toString());
    bootstrap(c1);
    window.location.href = '../index.html';
    return false; // prevent reload
};
