'use strict';
const { Pool } = require('pg');

const pool = new Pool({
  host: '127.0.0.1',
  port: 5432,
  database: 'data',
  user: 'postgres',
  password: '12345'
});


module.exports = pool;

