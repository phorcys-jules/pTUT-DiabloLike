import { Character } from "./character/Character";
export declare class User {
    pseudo: string;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    static gold: number;
    chars: Character[];
    constructor(pseudo: string, firstname: string, lastname: string, password: string, email: string, gold?: number, chars?: Character[]);
    ajouterChar(char: Character): void;
    updateGold(montant?: number): void;
    toString(): string;
    static whoIsConnected(): Promise<void>;
}
