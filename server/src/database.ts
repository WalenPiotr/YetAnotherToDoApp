import pg, { PoolClient } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });

pool.on('error', (error: Error, client: PoolClient) => {
    //Add some form of error handling!!!
    console.log(error);
    process.exit(-1);
});

export default pool;
