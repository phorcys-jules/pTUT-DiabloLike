export abstract class Character extends Object{
    name:string;
    lvl:number;

    constructor(name:string, lvl:number =1) {
        //Level has  default value of 1
        super();
        this.name = name;
        this.lvl = lvl;
    }

    toString(){
        return `${this.name} est un ${this.constructor.name} de niveau ${this.lvl}`
    }
}