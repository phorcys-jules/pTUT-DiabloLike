import { Archer } from "./character/Archer.js";
import { Warrior } from "./character/Warrior.js";
import { Wizard } from "./character/Wizard.js";
import { Zombie } from "./character/Zombie.js";
import { bootstrap } from "./engine/bootstrap.js";

document.getElementById('run')?.addEventListener("click", function(){
    //bootstrap(new Wizard('Gandalf'), [new Zombie()]);
    bootstrap(new Archer('Legolas'), [new Zombie()]);
});