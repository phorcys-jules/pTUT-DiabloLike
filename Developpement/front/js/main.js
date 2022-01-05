var _a;
import { Guerrier } from "./character/Guerrier.js";
import { bootstrap } from "./engine/bootstrap.js";
(_a = document.getElementById('run')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    bootstrap(new Guerrier('Conan'));
});
