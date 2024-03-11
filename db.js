const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sol',
  password: 'postgres',
  port: 5432,
});

const handleQueryError = (error, response) => {
  console.error('Erro na consulta SQL:', error);
  response.status(500).send('Erro ao executar a consulta SQL.');
};

module.exports = {
  pool,
  handleQueryError,
};