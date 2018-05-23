require('dotenv').config({ path: '../.env' });
const pg = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new pg.Client(connectionString);

async function create() {
    await client.connect();
    var result = await client.query(
        'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)'
    );
    console.log(result.rows);
    client.end();
}

create();
