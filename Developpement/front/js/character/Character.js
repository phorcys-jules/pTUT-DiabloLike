export class Character extends Object {
    constructor(name, lvl = 1) {
        //Level has  default value of 1
        super();
        this.name = name;
        this.lvl = lvl;
    }
    toString() {
        return `${this.name} est un ${this.constructor.name} de niveau ${this.lvl}`;
    }
}
