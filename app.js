const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const { pool, handleQueryError } = require('./db');

// Servir recursos estáticos diretamente do diretório node_modules
app.use('/static', express.static(path.join(__dirname, 'node_modules')));

// Servir recursos estáticos do diretório public
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = 3000;


// Rota para obter as configurações do mapa
app.get('/map-config', (req, res) => {
  res.json(mapConfig);
});

// Restante do código

app.get('/buscar_valores_torres', async (req, res) => {
  try {
    const { atributo, valor } = req.query;
    let query;
    if (atributo === 'nm_mun') {
      query = `SELECT DISTINCT ${atributo} FROM torres WHERE ${atributo} ILIKE $1 LIMIT 10`;
    } else if (atributo === 'torreseq') {
      query = `SELECT DISTINCT ${atributo} FROM torres WHERE ${atributo} = $1 LIMIT 10`;
    } else if (atributo === 'torrekm') {
      query = `SELECT DISTINCT ${atributo} FROM torres WHERE ${atributo} ILIKE $1 LIMIT 10`;
    } else if (atributo === 'tipo') {
      query = `SELECT DISTINCT ${atributo} FROM torres WHERE ${atributo} ILIKE $1 LIMIT 10`;
    } else if (atributo === 'obs') {
      query = `SELECT DISTINCT ${atributo} FROM torres WHERE ${atributo} ILIKE $1 LIMIT 10`;
    } else if (atributo === 'descricao') {
      query = `SELECT DISTINCT ${atributo} FROM torres WHERE ${atributo} ILIKE $1 LIMIT 10`;
    } else {
      // Caso o atributo não seja reconhecido, envie um erro
      return res.status(400).send('Atributo inválido.');    }

    // Altere esta linha para usar ILIKE para todos os campos exceto 'torreseq'
    const queryParam = (atributo !== 'torreseq') ? `%${valor}%` : valor;

    const result = await pool.query(query, [queryParam]);
    const valores = result.rows.map(row => row[atributo]);
    res.json(valores);
  } catch (error) {
    handleQueryError(error, res);
  }
});

 
app.post('/verificar_torres_no_poligono', async (req, res) => {
  try {
  const polygonCoordinates = req.body.polygonCoordinates; 
  const query = `
    SELECT * FROM torres
    WHERE ST_Within(geom, ST_GeomFromText('POLYGON((${polygonCoordinates}))', 4326))
  `;

  pool.query(query, (error, result) => {
    if (error) {
      console.error('Erro ao executar a consulta SQL:', error);
      res.status(500).send('Erro ao verificar as torres no polígono.');
    } else {
      const rows = result.rows;
      res.json({ pointsInPolygon: rows });      
    }
  });
} catch (error) {
  handleQueryError(error, res);
}
});

app.post('/buscar_torres', async (req, res) => {
  try {
    const { atributo, valor } = req.body;
    let query;
    let queryParams;

    if (atributo === 'nm_mun') {

      query = `SELECT geom, torreseq, torrekm, nm_mun, tipo, descricao, obs FROM torres WHERE ${atributo} ILIKE $1`;
      queryParams = [`%${valor}%`];  // Usando wildcards para busca parcial
    } else if (atributo === 'torreseq') {

      query = `SELECT geom, torreseq, torrekm, nm_mun, tipo, descricao, obs FROM torres WHERE ${atributo} = $1`;
      queryParams = [valor]; 
    } else if (atributo === 'torrekm') {

      query = `SELECT geom, torreseq, torrekm, nm_mun, tipo, descricao, obs FROM torres WHERE ${atributo} = $1`;
      queryParams = [valor]; 
    } else if (atributo === 'tipo') {

      query = `SELECT geom, torreseq, torrekm, nm_mun, tipo, descricao, obs FROM torres WHERE ${atributo} = $1`;
      queryParams = [valor]; 
    } else if (atributo === 'descricao') {

      query = `SELECT geom, torreseq, torrekm, nm_mun, tipo, descricao, obs FROM torres WHERE ${atributo} = $1`;
      queryParams = [valor]; 
    } else if (atributo === 'obs') {

      query = `SELECT geom, torreseq, torrekm, nm_mun, tipo, descricao, obs FROM torres WHERE ${atributo} = $1`;
      queryParams = [valor]; 
    } else {
      // Caso o atributo não seja reconhecido, envie um erro
      return res.status(400).send('Atributo inválido.');
    }

    pool.query(query, queryParams, (error, result) => {
      if (error) {
        console.error('Erro ao executar a consulta SQL:', error);
        res.status(500).send('Erro ao buscar dados no banco de dados.');
      } else {
        const rows = result.rows;
        console.log(`Encontrados ${rows.length} resultados para ${valor} em ${atributo}`);

        // Verifique se há resultados
        if (rows.length > 0) {
          // Mapeie todos os resultados para um array
          const rowData = rows.map(row => ({
            geom: row.geom,
            torreseq: row.torreseq,
            torrekm: row.torrekm,
            nm_mun: row.nm_mun,
            tipo: row.tipo,
            descricao: row.descricao,
            obs: row.obs
          }));
          console.log('Resultado da consulta:', rowData);
          res.json({ rows: rowData });
        } else {
          res.status(404).json({ message: 'Nenhum resultado encontrado para os critérios fornecidos.' });
        }
      }
    });
  } catch (error) {
    handleQueryError(error, res);
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
