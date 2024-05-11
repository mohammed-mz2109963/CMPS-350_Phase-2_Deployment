const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'Your_Database_Connection_String',
  ssl: { rejectUnauthorized: false }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};