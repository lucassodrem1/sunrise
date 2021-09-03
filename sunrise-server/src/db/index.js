const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

pool
  .connect()
  .then(client => {
    console.log('DB connected!');
    client.release();
  })
  .catch(err => console.log(err));

exports.query = (text, param) => pool.query(text, param);
