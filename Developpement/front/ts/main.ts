import { Archer } from "./character/Archer.js";
import { Warrior } from "./character/Warrior.js";
import { Wizard } from "./character/Wizard.js";
import { Zombie } from "./character/Zombie.js";
import { bootstrap } from "./engine/bootstrap.js";
import { User } from "./User.js";

//TODO add main dans createChar, crreate user .html
//si pas co (Game.whoIs Connected) et que page != login ou sign in ==> go to login
//Si connecte et que pagge == index : bootstrap

document.getElementById('run')?.addEventListener("click", function(){
    //bootstrap(new Wizard('Gandalf'), [new Zombie()]);
    //bootstrap(new Wizard('Gandalf'), [new Zombie()]);
    //bootstrap(new Archer('Legolas'), [new Zombie()]);
    
    bootstrap(new User('Phorcys', 'a','a','a','a', 100, [new Wizard('Gandalf')]), []);

});

bootstrap(new User('Phorcys', 'a','a','a','a', 100, [new Wizard('Gandalf')]), []);

