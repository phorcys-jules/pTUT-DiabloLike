import e from "cors";
import { Archer } from "./character/Archer.js";
import { Warrior } from "./character/Warrior.js";
import { Wizard } from "./character/Wizard.js";
import { Zombie } from "./character/Zombie.js";
import { bootstrap } from "./engine/bootstrap.js";
import { User } from "./User.js";

//TODO add main dans createChar, crreate user .html
//si pas co (Game.whoIs Connected) et que page != login ou sign in ==> go to login
//Si connecte et que pagge == index : bootstrap


bootstrap(new User('Phorcys', 'a','a','a','a', 100, [new Wizard('Gandalf'), new Warrior(), new Archer()]), []);

document.getElementById('btn_fullscreen')?.addEventListener("click", function(){
    let elem = document.documentElement;

  if (!document.fullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});


