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

const port = 3000;






// Configurações do mapa
const mapConfig = {
  center: [-49, -15],
  zoom: 5.5,
  // ... outras configurações do mapa
};

// Rota para obter as configurações do mapa
app.get('/map-config', (req, res) => {
  res.json(mapConfig);
});





// Restante do código

app.get('/buscar_valores', async (req, res) => {
  try {
    const { atributo, valor } = req.query;
    const query = `SELECT DISTINCT ${atributo} FROM pa_br_sol_torres WHERE ${atributo} ILIKE $1 LIMIT 10`;

    const result = await pool.query(query, [`%${valor}%`]);
    const valores = result.rows.map(row => row[atributo]);

    res.json(valores);
  } catch (error) {
    handleQueryError(error, res);
  }
});
 
app.post('/verificar_pontos_no_poligono', async (req, res) => {
  try {
  const polygonCoordinates = req.body.polygonCoordinates; 
  const query = `
    SELECT * FROM pa_br_sol_torres
    WHERE ST_Within(geom, ST_GeomFromText('POLYGON((${polygonCoordinates}))', 4326))
  `;

  pool.query(query, (error, result) => {
    if (error) {
      console.error('Erro ao executar a consulta SQL:', error);
      res.status(500).send('Erro ao verificar os pontos no polígono.');
    } else {
      const rows = result.rows;
      res.json({ pointsInPolygon: rows });      
    }
  });
} catch (error) {
  handleQueryError(error, res);
}
});

app.post('/buscar', async (req, res) => {
  try {
  const { atributo, valor } = req.body;
  const query = `SELECT geom,idsol,cliente,municipio,uf,status,fase,fazenda,dealer,dataativacao,projeto,cap_ton_7km,qto_armzs_7km,assent_area_7km,assent_qtd_7km,ti_area_7km,ti_qtd_7km,ucus_area_7km,ucus_qtd_7km,ucpi_area_7km,ucpi_qtd_7km,car_areamedia,car_qtd_7km,sigef_areamedia,sigef_qtd_7km,snci_areamedia,snci_qtd_7km,usinas_qtd_7km,frigorificos_qtd_7km,lulc_formacaoflorestal,lulc_formacaosavanica,lulc_mangue,lulc_florestaalagavel,lulc_silvicultura,lulc_campoalagadoeareapantanosa,lulc_formacaocampestre,lulc_outrasformacoesnaoflorestais,lulc_pastagem,lulc_cana,lulc_areaurbanizada,lulc_apicum,lulc_riolagoeoceano,lulc_soja,lulc_arroz,lulc_outraslavourastemporarias,lulc_cafe,lulc_citrus,lulc_outraslavourasperenes,lulc_restingaarborea,lulc_restingaherbacea,lulc_algodao FROM pa_br_sol_torres WHERE ${atributo} LIKE $1`;

  pool.query(query, [`%${valor}%`], (error, result) => {
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
          idsol: row.idsol,
          cliente: row.cliente,
          municipio: row.municipio,
          uf: row.uf,
          status: row.status,
          fase: row.fase,
          fazenda: row.fazenda,
          dealer: row.dealer,
          dataativacao: row.dataativacao,
          projeto: row.projeto,
          cap_ton_7km: row.cap_ton_7km,
          qto_armzs_7km: row.qto_armzs_7km,
          assent_area_7km: row.assent_area_7km,
          assent_qtd_7km: row.assent_qtd_7km,
          ti_area_7km: row.ti_area_7km,
          ti_qtd_7km: row.ti_qtd_7km,
          ucus_area_7km: row.ucus_area_7km,
          ucus_qtd_7km: row.ucus_qtd_7km,
          ucpi_area_7km: row.ucpi_area_7km,
          ucpi_qtd_7km: row.ucpi_qtd_7km,
          car_areamedia: row.car_areamedia,
          car_qtd_7km: row.car_qtd_7km,
          sigef_areamedia: row.sigef_areamedia,
          sigef_qtd_7km: row.sigef_qtd_7km,
          snci_areamedia: row.snci_areamedia,
          snci_qtd_7km: row.snci_qtd_7km,
          usinas_qtd_7km: row.usinas_qtd_7km,
          frigorificos_qtd_7km: row.frigorificos_qtd_7km,
          lulc_formacaoflorestal: row.lulc_formacaoflorestal,
          lulc_formacaosavanica: row.lulc_formacaosavanica,
          lulc_mangue: row.lulc_mangue,
          lulc_florestaalagavel: row.lulc_florestaalagavel,
          lulc_silvicultura: row.lulc_silvicultura,
          lulc_campoalagadoeareapantanosa: row.lulc_campoalagadoeareapantanosa,
          lulc_formacaocampestre: row.lulc_formacaocampestre,
          lulc_outrasformacoesnaoflorestais: row.lulc_outrasformacoesnaoflorestais,
          lulc_pastagem: row.lulc_pastagem,
          lulc_cana: row.lulc_cana,
          lulc_areaurbanizada: row.lulc_areaurbanizada,
          lulc_apicum: row.lulc_apicum,
          lulc_riolagoeoceano: row.lulc_riolagoeoceano,
          lulc_soja: row.lulc_soja,
          lulc_arroz: row.lulc_arroz,
          lulc_outraslavourastemporarias: row.lulc_outraslavourastemporarias,
          lulc_cafe: row.lulc_cafe,
          lulc_citrus: row.lulc_citrus,
          lulc_outraslavourasperenes: row.lulc_outraslavourasperenes,
          lulc_restingaarborea: row.lulc_restingaarborea,
          lulc_restingaherbacea: row.lulc_restingaherbacea,
          lulc_algodao: row.lulc_algodao
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
