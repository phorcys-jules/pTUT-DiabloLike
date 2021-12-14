export declare class User {
    pseudo: string;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    constructor(pseudo: string, firstname: string, lastname: string, password: string, email: string);
    sql_insert(): string;
}
