/*const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "autopet_feeder"
});*/

module.exports = client;


var pg = require('pg')
var config = {
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "postgres",
    database: "autopet_feeder",
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000 
}

var pool = new pg.Pool(config);

module.exports = pool;