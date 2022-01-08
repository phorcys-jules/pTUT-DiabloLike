import { createPool, Pool } from 'mysql2/promise';


//TODO Later utiliser fichier config .env
export async function connect(): Promise<Pool> {
    const connection = await createPool({
        host: 'localhost',
        port: 3308,
        user: 'root',
        database: 'diablolike',
        connectionLimit: 10
    });
    return connection;
}