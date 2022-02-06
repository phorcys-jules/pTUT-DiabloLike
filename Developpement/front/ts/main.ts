import { Warrior } from "./character/Warrior";
import { Wizard } from "./character/Wizard";
import { Zombie } from "./character/Zombie";
import { bootstrap } from "./engine/bootstrap";

document.getElementById('run')?.addEventListener("click", function(){
    bootstrap(new Wizard('Gandalf'), [new Zombie()]);
});