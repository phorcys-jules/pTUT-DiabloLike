import { Guerrier } from "./character/Guerrier.js";
import { bootstrap } from "./engine/bootstrap.js";

document.getElementById('run')?.addEventListener("click", function(){
    bootstrap(new Guerrier('Conan'));
});