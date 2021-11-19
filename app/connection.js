var pg = require('pg');
var config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: process.env.DATABASE_POOL,
    idleTimeoutMillis: process.env.DATABASE_TIMEOUT
};

var pool = new pg.Pool(config);

module.exports = pool;