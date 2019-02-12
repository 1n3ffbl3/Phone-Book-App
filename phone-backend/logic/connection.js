const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'phoneBook',
    password: 'postgres',
    port: 5433,
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    end: () => {
        console.log("Ending connection of pool");
        pool.end();
    }
  };