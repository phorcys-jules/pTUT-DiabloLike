import e from "cors";
import { Archer } from "./character/Archer.js";
import { Warrior } from "./character/Warrior.js";
import { Wizard } from "./character/Wizard.js";
import { Zombie } from "./character/Zombie.js";
import { bootstrap } from "./engine/bootstrap.js";
import { User } from "./User.js";

document.getElementById('run')?.addEventListener("click", function(){
    //bootstrap(new Wizard('Gandalf'), [new Zombie()]);
    //bootstrap(new Wizard('Gandalf'), [new Zombie()]);
    //bootstrap(new Archer('Legolas'), [new Zombie()]);
    
    bootstrap(new User('Phorcys', 'a','a','a','a', 100, [new Wizard('Gandalf')]), []);

});

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
