const attributionControl = new ol.control.Attribution({
    collapsible: true
  });  

const view = new ol.View({
  center: [-39.823866, -13.676764],
  zoom: 20,
  projection: 'EPSG:4326',
});

const map = new ol.Map({
  view: view,
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM({
        
      }),
      visible: true
    }),
  ],
  target: "js-map"
});  

const info_torres = new ol.source.TileWMS({
  ratio: 1,
  url: 'http://localhost:8080/geoserver/torres/wms',
  params: {'VERSION': '1.1.0',  
        "STYLES": '',
        "LAYERS": 'torres:pa_br_sol_torres ',
        "exceptions": 'application/vnd.ogc.se_inimage',
  }
})

const info_municipios = new ol.source.TileWMS({
  ratio: 1,
  url: 'http://localhost:8080/geoserver/limites/wms',
  params: {'VERSION': '1.1.0',  
        "STYLES": '',
        "LAYERS": 'limites:pa_br_ibge_municipios_2022',
        "exceptions": 'application/vnd.ogc.se_inimage',
  }
})

const torres_ativadas = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/torres/wms?service=WMS&version=1.1.0&request=GetMap&layers=torres%3Apa_br_sol_torres_ativadas',
  }),
  visible: true,
  title: 'torres_ativadas'
});

const torres_emimplantacao = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/torres/wms?service=WMS&version=1.1.0&request=GetMap&layers=torres%3Apa_br_sol_torres_emimplantacao',
  }),
  visible: true,
  title: 'torres_emimplantacao'
});

const torres_projeto = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/torres/wms?service=WMS&version=1.1.0&request=GetMap&layers=torres%3Apa_br_sol_torres_projeto',
  }),
  visible: true,
  title: 'torres_projeto'
});

var torres_raio10km_filtro = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: urlComFiltroCQL,
    params: {'LAYERS': 'torres:pa_br_sol_torres_raio10km', 'TILED': true},
    serverType: 'geoserver'
  }),
  visible: true,
  title: 'torres_raio10km_filtro' 
});
  
const armazens = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/infraestrutura/wms?service=WMS&version=1.1.0&request=GetMap&layers=infraestrutura%3Apa_br_conab_armazens_01112021',
  }),
  visible: false,
  title: 'armazens'
});

const usinas = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/infraestrutura/wms?service=WMS&version=1.1.0&request=GetMap&layers=infraestrutura%3Apa_br_conab_usinascana_01112021',
  }),
  visible: false,
  title: 'usinas'
});

const frigorificos = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/infraestrutura/wms?service=WMS&version=1.1.0&request=GetMap&layers=infraestrutura%3Apa_br_sif_frigorificos_01112021',
  }),
  visible: false,
  title: 'frigorificos'
});

const imoveis_rurais_car = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/fundiario/wms?service=WMS&version=1.1.0&request=GetMap&layers=fundiario%3Apa_br_car_areaimovel_11042023',
  }),
  visible: false,
  title: 'imoveis_rurais_car'
});

const imoveis_rurais_sigef = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/fundiario/wms?service=WMS&version=1.1.0&request=GetMap&layers=fundiario%3Apa_br_sigef_areaimovel_24092023',
  }),
  visible: false,
  title: 'imoveis_rurais_sigef'
});

const imoveis_rurais_snci = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/fundiario/wms?service=WMS&version=1.1.0&request=GetMap&layers=fundiario%3Apa_br_snci_imovelcertificado_24092023',
  }),
  visible: false,
  title: 'imoveis_rurais_snci'
});

const assentamentos = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/fundiario/wms?service=WMS&version=1.1.0&request=GetMap&layers=fundiario%3Apa_br_incra_assentamentos_24092023',
  }),
  visible: false,
  title: 'assentamentos'
});

const terras_indigenas = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/fundiario/wms?service=WMS&version=1.1.0&request=GetMap&layers=fundiario%3Apa_br_funai_terrasindigenas_16072021',
  }),
  visible: false,
  title: 'terras_indigenas'
});

const ucs_pi = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/limites/wms?service=WMS&version=1.1.0&request=GetMap&layers=limites%3Apa_br_mma_ucs_pi_16072021',
  }),
  visible: false,
  title: 'ucs_pi'
});

const ucs_us = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/limites/wms?service=WMS&version=1.1.0&request=GetMap&layers=limites%3Apa_br_mma_ucs_us_16072021',
  }),
  visible: false,
  title: 'ucs_us'
});

const municipios = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/limites/wms?service=WMS&version=1.1.0&request=GetMap&layers=limites%3Apa_br_ibge_municipios_2022',
  }),
  visible: false,
  title: 'municipios'
});

const uf = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/limites/wms?service=WMS&version=1.1.0&request=GetMap&layers=limites%3Apa_br_ibge_uf_2022',
  }),
  visible: false,
  title: 'uf'
});

const osm_basemap = new ol.layer.Tile({
  source: new ol.source.OSM(),    
  visible: true,
  title: 'osm_basemap'        
})

const br_lulc_2022 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/ne/wms?service=WMS&version=1.1.0&request=GetMap&layers=ne%3Abrasil_coverage_2022',
  }),
  visible: false,
  title: 'br_lulc_2022'
});

const satelite_planet = new ol.layer.Tile({
  source: new ol.source.XYZ({
      url: 'https://tiles{0-3}.planet.com/basemaps/v1/planet-tiles/planet_medres_visual_2022-08_mosaic/gmap/{z}/{x}/{y}.png?api_key=PLAKdea77c92bc87478d9c51e3cc19c5a7fd',
  }),
  visible: false,
  title: 'satelite_planet'
})   

const checkboxGroup = new ol.layer.Group({
  layers: [
    uf, municipios, ucs_pi, ucs_us, terras_indigenas, assentamentos, imoveis_rurais_snci, imoveis_rurais_sigef, imoveis_rurais_car, frigorificos, armazens, usinas, torres_projeto, torres_emimplantacao, torres_ativadas
  ]
});

checkboxGroup.getLayers().push(torres_raio10km_filtro);

const baseLayerGroup = new ol.layer.Group({
  layers: [
    osm_basemap, br_lulc_2022, satelite_planet
  ]
})

// Adicione um ID único a cada camada

torres_ativadas.set('layerId', 'torresativadasLayer');
torres_emimplantacao.set('layerId', 'torresemimplantacaoLayer');
torres_projeto.set('layerId', 'torresprojetoLayer');
armazens.set('layerId', 'armazensLayer');
frigorificos.set('layerId', 'frigorificosLayer');
usinas.set('layerId', 'usinasLayer');
imoveis_rurais_car.set('layerId', 'imoveis_rurais_carLayer');
imoveis_rurais_sigef.set('layerId', 'imoveis_rurais_sigefLayer');
imoveis_rurais_snci.set('layerId', 'imoveis_rurais_snciLayer');
assentamentos.set('layerId', 'assentamentosLayer');
terras_indigenas.set('layerId', 'terras_indigenasLayer');
ucs_pi.set('layerId', 'ucs_piLayer');
ucs_us.set('layerId', 'ucs_usLayer');
municipios.set('layerId', 'municipiosLayer');
uf.set('layerId', 'ufLayer');

// Adicione as camadas ao mapa OpenLayers

map.addLayer(torres_ativadas);
map.addLayer(torres_emimplantacao);
map.addLayer(torres_projeto);
map.addLayer(torres_raio10km_filtro);
map.addLayer(armazens);  
map.addLayer(frigorificos);
map.addLayer(usinas);
map.addLayer(imoveis_rurais_car);
map.addLayer(imoveis_rurais_sigef);
map.addLayer(imoveis_rurais_snci);
map.addLayer(assentamentos);
map.addLayer(terras_indigenas);
map.addLayer(ucs_pi);
map.addLayer(ucs_us);
map.addLayer(municipios);
map.addLayer(uf);
map.addLayer(baseLayerGroup);
map.addLayer(checkboxGroup);
map.removeControl(map.getControls().getArray().find(control => control instanceof ol.control.Zoom));

// Seleciona os radio buttons

const osmBasemapRadio = document.getElementById("osm-basemap-radio");
const lulc2022Radio = document.getElementById("lulc-2022-radio");
const satellite2023Radio = document.getElementById("satellite-2023-radio");

// Adiciona eventos de mudança aos radio buttons para alternar entre as camadas de mapa base

osmBasemapRadio.addEventListener("change", () => {
  if (osmBasemapRadio.checked) {
    osm_basemap.setVisible(true);
    br_lulc_2022.setVisible(false);
    satelite_planet.setVisible(false);
  }
});

lulc2022Radio.addEventListener("change", () => {
  if (lulc2022Radio.checked) {
    osm_basemap.setVisible(false);
    br_lulc_2022.setVisible(true);
    satelite_planet.setVisible(false);
  }
});

satellite2023Radio.addEventListener("change", () => {
  if (satellite2023Radio.checked) {
    osm_basemap.setVisible(false);
    br_lulc_2022.setVisible(false);
    satelite_planet.setVisible(true);
  }
});  
var info = document.getElementById('info');
$(document).ready(function () {  
  
// Mapeamento de alias para nomes de colunas
const columnAlias = {
  idsol: 'ID SOL',
  cliente: 'Cliente',
  municipio: 'Município',
  uf: 'UF',
  status: 'Status',
  projeto: 'Projeto',
  fazenda: 'Fazenda',
  dealer: 'Dealer',
  dataativacao: 'Data de ativação',
  // Adicione outros campos e alias aqui
};

// Definição de vegetação nativa
const veg_nativa = {
  lulc_formacaoflorestal: 0,
  lulc_formacaosavanica: 0,
  lulc_mangue: 0,
  lulc_florestaalagavel: 0,
  lulc_campoalagadoeareapantanosa: 0,
  lulc_formacaocampestre: 0,
  lulc_pastagem: 0,
  lulc_restingaarborea: 0,
  lulc_restingaherbacea: 0
};

// Definição de lavouras perenes
const lav_perenes = {
  lulc_cafe: 0,
  lulc_citrus: 0,
  lulc_outraslavourasperenes: 0 
};

// Definição de outras lavouras temporarias
const outras_lav_temporarias = {
  lulc_arroz: 0,
  lulc_algodao: 0,
  lulc_outraslavourastemporarias: 0 
};
  
// Mapeamento de campos adicionais para IDs de células
const fieldCellIds = {
  cap_ton_7km: 'cap_ton_7km_tab',
  qto_armzs_7km: 'qto_armzs_7km_tab',
  assent_area_7km: 'assent_area_7km_tab',
  assent_qtd_7km: 'assent_qtd_7km_tab',
  ti_area_7km: 'ti_area_7km_tab',
  ti_qtd_7km: 'ti_qtd_7km_tab',
  ucus_area_7km: 'ucus_area_7km_tab',
  ucus_qtd_7km: 'ucus_qtd_7km_tab',
  ucpi_area_7km: 'ucpi_area_7km_tab',
  ucpi_qtd_7km: 'ucpi_qtd_7km_tab',
  car_areamedia: 'car_areamedia_tab',
  car_qtd_7km: 'car_qtd_7km_tab',
  sigef_areamedia: 'sigef_areamedia_tab',
  sigef_qtd_7km: 'sigef_qtd_7km_tab',
  snci_areamedia: 'snci_areamedia_tab',
  snci_qtd_7km: 'snci_qtd_7km_tab',
  usinas_qtd_7km: 'usinas_qtd_7km_tab',
  frigorificos_qtd_7km: 'frigorificos_qtd_7km_tab',
  lulc_cana: 'lulc_cana_tab',
  lulc_soja: 'lulc_soja_tab',
  lulc_pastagem: 'lulc_pastagem_tab',
  lulc_silvicultura: 'lulc_silvicultura_tab',
  lulc_riolagoeoceano: 'lulc_riolagoeoceano_tab',
  lulc_areaurbanizada: 'lulc_areaurbanizada_tab'                      
};

// Adicione a funcionalidade de auto preenchimento
$('#valor').on('input', function () {
  const atributo = $('[name="atributo"]').val();
  const valor = $(this).val();
  $.get('/buscar_valores', { atributo, valor }, function (response) {
    const autoPreenchimento = $('#auto-preenchimento');
    autoPreenchimento.empty(); // Limpa a lista de auto preenchimento
    // Adicione cada valor retornado como uma opção na lista de auto preenchimento
    response.forEach(function (valor) {
      autoPreenchimento.append('<option value="' + valor + '">');
    });
  });
});

drawPolygonButton.addEventListener('click', () => {    
  map.removeLayer(vectorLayer); 
  map.removeLayer(pointLayer); 
  
  // Ativar a ferramenta de desenho
  draw = new ol.interaction.Draw({
    source: new ol.source.Vector(),
    type: 'Polygon', // Isso permite desenhar polígonos
  });
  map.addInteraction(draw);    

  draw.on('drawend', (event) => {
    const polygonFeature = event.feature;
    const polygonGeometry = polygonFeature.getGeometry();
    const coordinates = polygonGeometry.getCoordinates()[0]; 
  
    // Construir a string de coordenadas do polígono
    const polygonCoordinates = coordinates.map(coord => coord.join(' ')).join(', ');
  
    // Fazer uma solicitação POST para a rota do servidor usando $.ajax
    $.ajax({
      type: 'POST',
      url: '/verificar_pontos_no_poligono', // Ajuste o URL conforme necessário
      data: { polygonCoordinates },
      success: function (response) {
        console.log(response)
        // Limpar o conteúdo atual da tabela
        $('#resultados tbody tr').each(function () {
          $(this).find('td').html('');
        });
        if (response.pointsInPolygon && response.pointsInPolygon.length > 0) {
          // Criar um formato para ler as geometrias WKT
          const wkbFormat = new ol.format.WKB();
          // Criar uma fonte de vetor para a camada de pontos
          const pointSource = new ol.source.Vector();
          // Iterar sobre os pontos na resposta
          response.pointsInPolygon.forEach(function (result, index) {              
            // Ler a geometria WKN da coluna "geom"
            const geometry = wkbFormat.readGeometry(result.geom);
          
            // Criar um recurso de vetor com a geometria
            const pointFeature = new ol.Feature({
              geometry: geometry,
            });
          
            // Adicionar o recurso à fonte de vetor
            pointSource.addFeature(pointFeature);
          });
        
          // Criar uma camada de vetor para os pontos
          pointLayer = new ol.layer.Vector({
            source: pointSource,
            style: new ol.style.Style({
              image: new ol.style.Icon({
                src: '/images/icon_yellow.png',
                scale: 1,
              }),
            }),
          });
        
          // Adicionar a camada de vetor dos pontos ao mapa
          map.addLayer(pointLayer);           
          // Obtenha o extent da camada
          const extent = pointLayer.getSource().getExtent();
          // Acesse a visão (view) do mapa
          const view = map.getView();
          // Obtenha a resolução do zoom adequada para cobrir o extent da camada
          const resolution = view.getResolutionForExtent(extent, map.getSize());
          // Defina o nível de zoom desejado (por exemplo, três níveis abaixo)
          const desiredZoomLevel = view.getZoomForResolution(resolution) - 2;
          // Defina o nível de zoom máximo desejado
          const maxZoomLevel = 21; // Substitua pelo valor máximo desejado
          // Garanta que o nível de zoom desejado não exceda o nível máximo
          const zoomLevel = Math.min(desiredZoomLevel, maxZoomLevel);
          // Configure a nova resolução com base no novo nível de zoom
          const newResolution = view.getResolutionForZoom(zoomLevel);
          // Configure o centro da visão no centro do extent da camada
          view.setCenter(ol.extent.getCenter(extent));
          // Defina a nova resolução
          view.setResolution(newResolution);
          // Criar o menu dropdown e preencher com os resultados
          const dropdown = $('<select>');
          dropdown.attr('id', 'resultado-dropdown');
          dropdown.addClass('custom-dropdown-pag'); // Adicionar classe de estilo personalizado   
          
          // Adicionar uma opção para cada resultado
          response.pointsInPolygon.forEach(function (result, index) {       
            
            // Verifique se há uma camada de pontos selecionada anteriormente e remova-a                      
            map.removeLayer(pointLayer_sel); 
            map.removeLayer(pointLayer_sel_v2);                                  
            
            // Crie uma fonte de vetor para a camada de pontos
            pointSource_sel = new ol.source.Vector();
            // Converta a geometria WKB em um formato que o OpenLayers possa entender
            wkb_sel = new ol.format.WKB();
            geometry_sel = wkb_sel.readGeometry(result.geom);
            
            // Crie um novo ponto com a geometria selecionada e o ícone desejado
            pointFeature_sel = new ol.Feature({
              geometry: geometry_sel,
            });              
          
            // Adicione o recurso à fonte de vetor
            pointSource_sel.addFeature(pointFeature_sel);
          
            // Crie uma camada de vetor para os pontos
            pointLayer_sel = new ol.layer.Vector({
              source: pointSource_sel,
              style: new ol.style.Style({
                image: new ol.style.Icon({
                  src: 'images/icon_black.png', // Ícone vermelho
                  scale: 1,
                }),
              }),
            });
          
            // Adicione a camada de vetor dos pontos ao mapa
            map.addLayer(pointLayer_sel);
            dropdown.append(
              $('<option>', {
                value: JSON.stringify(result),
                text: result.idsol, // Usar result.idsol como o texto
              })
            );              
          });
          // Adicionar um ouvinte de evento de alteração ao menu dropdown
          dropdown.on('change', function () {
            selectedValue = JSON.parse($(this).val()); // Converter de volta para objeto
            // Verifique se há uma camada de pontos selecionada anteriormente e remova-a
            if (pointLayer_sel) {
              map.removeLayer(pointLayer_sel);
              map.removeLayer(pointLayer_sel_v2);
            }
            
            // Crie uma fonte de vetor para a camada de pontos
            pointSource_sel = new ol.source.Vector();
            // Converta a geometria WKB em um formato que o OpenLayers possa entender
            wkb_sel = new ol.format.WKB();
            geometry_sel = wkb_sel.readGeometry(selectedValue.geom);
            
            // Crie um novo ponto com a geometria selecionada e o ícone desejado
            pointFeature_sel = new ol.Feature({
              geometry: geometry_sel,
            });              
          
            // Adicione o recurso à fonte de vetor
            pointSource_sel.addFeature(pointFeature_sel);
          
            // Crie uma camada de vetor para os pontos
            pointLayer_sel = new ol.layer.Vector({
              source: pointSource_sel,
              style: new ol.style.Style({
                image: new ol.style.Icon({
                  src: 'images/icon_black.png', // Ícone vermelho
                  scale: 1,
                }),
              }),
            });
          
            // Adicione a camada de vetor dos pontos ao mapa
            map.addLayer(pointLayer_sel);
            displaySelectedResult(selectedValue) 
          });
          // Exibir o menu dropdown na div com id "paginacao"
          $('#paginacao').empty().append(dropdown).append('&nbsp;&nbsp;&nbsp;(' + response.pointsInPolygon.length + ' resultados)');
          // Exibir o primeiro resultado por padrão (opcional)
          if (response.pointsInPolygon.length > 0) {
            
            dropdown.val(JSON.stringify(response.pointsInPolygon[response.pointsInPolygon.length-1]));
            displaySelectedResult(response.pointsInPolygon[response.pointsInPolygon.length-1]);
          }
        } else {
          // Se não houver resultados, você pode exibir uma mensagem na tabela
          $('#idsolRow td').html('Nenhum resultado encontrado.');
          $('#paginacao').empty(); // Limpar o menu dropdown
        }
      },
      error: function (error) {
        console.error('Erro ao verificar os pontos no polígono:', error);
      }
    });
  
    // Remover a interação de desenho
    map.removeInteraction(draw);
  
    // Criar uma nova camada de vetor com a feature do polígono desenhado
    vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [polygonFeature], // Adicionar a feature à fonte de vetor
      }),
    });    
    // Adicionar a camada de vetor ao mapa
    map.addLayer(vectorLayer);
  });  
});

stopDrawingButton.addEventListener('click', () => {
  // Parar a ferramenta de desenho
  map.removeInteraction(draw);

  // Remover a camada de vetor, se existir
  if (vectorLayer) {
    map.removeLayer(vectorLayer); 
    map.removeLayer(pointLayer)    
  }
});      

$('#search-form').submit(function (e) {
  e.preventDefault(); // Impede o envio do formulário padrão
  const atributo = $('[name="atributo"]').val();
  const valor = $('[name="valor"]').val();
  $.ajax({
    type: 'POST',
    url: '/buscar',
    data: { atributo, valor },
    success: function (response) {
      map.removeLayer(pointLayer); 
      console.log(response)
      // Limpar o conteúdo atual da tabela
      $('#resultados tbody tr').each(function () {
        $(this).find('td').html('');
      });
      // Verificar se há resultados na resposta do servidor
      if (response.rows && response.rows.length > 0) {     
        // Criar um formato para ler as geometrias WKT
        const wkbFormat = new ol.format.WKB();
        // Criar uma fonte de vetor para a camada de pontos
        const pointSource = new ol.source.Vector();
        // Iterar sobre os pontos na resposta
        response.rows.forEach(function (result, index) {              
          // Ler a geometria WKN da coluna "geom"
          const geometry = wkbFormat.readGeometry(result.geom);
        
          // Criar um recurso de vetor com a geometria
          const pointFeature = new ol.Feature({
            geometry: geometry,
          });
        
          // Adicionar o recurso à fonte de vetor
          pointSource.addFeature(pointFeature);
        });
      
        // Criar uma camada de vetor para os pontos
        pointLayer = new ol.layer.Vector({
          source: pointSource,
          style: new ol.style.Style({
            image: new ol.style.Icon({
              src: '/images/icon_grey.png',
              scale: 1,
            }),
          }),
        });
      
        // Adicionar a camada de vetor dos pontos ao mapa
        map.addLayer(pointLayer);
        // Obtenha o extent da camada
        const extent = pointLayer.getSource().getExtent();
        // Acesse a visão (view) do mapa
        const view = map.getView();
         // Obtenha a resolução do zoom adequada para cobrir o extent da camada
        const resolution = view.getResolutionForExtent(extent, map.getSize());
         // Defina o nível de zoom desejado (por exemplo, três níveis abaixo)
        const desiredZoomLevel = view.getZoomForResolution(resolution) - 2;
         // Defina o nível de zoom máximo desejado
        const maxZoomLevel = 13; // Substitua pelo valor máximo desejado
         // Garanta que o nível de zoom desejado não exceda o nível máximo
        const zoomLevel = Math.min(desiredZoomLevel, maxZoomLevel);
         // Configure a nova resolução com base no novo nível de zoom
        const newResolution = view.getResolutionForZoom(zoomLevel);
         // Configure o centro da visão no centro do extent da camada
        view.setCenter(ol.extent.getCenter(extent));
         // Defina a nova resolução
        view.setResolution(newResolution);
        // Criar o menu dropdown e preencher com os resultados
        const dropdown = $('<select>');
        dropdown.attr('id', 'resultado-dropdown');
        dropdown.addClass('custom-dropdown-pag'); // Adicionar classe de estilo personalizado
        // Adicionar uma opção para cada resultado
        response.rows.forEach(function (result, index) {       
          
            // Verifique se há uma camada de pontos selecionada anteriormente e remova-a                      
            map.removeLayer(pointLayer_sel); 
            map.removeLayer(pointLayer_sel_v2);                                  

            // Crie uma fonte de vetor para a camada de pontos
            pointSource_sel = new ol.source.Vector();

            // Converta a geometria WKB em um formato que o OpenLayers possa entender
            wkb_sel = new ol.format.WKB();
            geometry_sel = wkb_sel.readGeometry(result.geom);  
            
            // Crie um novo ponto com a geometria selecionada e o ícone desejado
            pointFeature_sel = new ol.Feature({
              geometry: geometry_sel,
            });              
          
            // Adicione o recurso à fonte de vetor
            pointSource_sel.addFeature(pointFeature_sel);
          
            // Crie uma camada de vetor para os pontos
            pointLayer_sel = new ol.layer.Vector({
              source: pointSource_sel,
              style: new ol.style.Style({
                image: new ol.style.Icon({
                  src: 'images/icon_black.png', // Ícone vermelho
                  scale: 1,
                }),
              }),
            });
          
            // Adicione a camada de vetor dos pontos ao mapa
            map.addLayer(pointLayer_sel);
          dropdown.append(
            
            $('<option>', {
              value: JSON.stringify(result),
              text: result.idsol, // Usar result.idsol como o texto                  
            })
          );
        });
        // Adicionar um ouvinte de evento de alteração ao menu dropdown
        dropdown.on('change', function () {
          const selectedValue = JSON.parse($(this).val()); // Converter de volta para objeto
          // Verifique se há uma camada de pontos selecionada anteriormente e remova-a
          if (pointLayer_sel) {
            map.removeLayer(pointLayer_sel);
            map.removeLayer(pointLayer_sel_v2);
          }
          
          // Crie uma fonte de vetor para a camada de pontos
          pointSource_sel = new ol.source.Vector();
          // Converta a geometria WKB em um formato que o OpenLayers possa entender
          wkb_sel = new ol.format.WKB();
          geometry_sel = wkb_sel.readGeometry(selectedValue.geom);
          
          // Crie um novo ponto com a geometria selecionada e o ícone desejado
          pointFeature_sel = new ol.Feature({
            geometry: geometry_sel,
          });              
        
          // Adicione o recurso à fonte de vetor
          pointSource_sel.addFeature(pointFeature_sel);
        
          // Crie uma camada de vetor para os pontos
          pointLayer_sel = new ol.layer.Vector({
            source: pointSource_sel,
            style: new ol.style.Style({
              image: new ol.style.Icon({
                src: 'images/icon_black.png', // Ícone vermelho
                scale: 1,
              }),
            }),
          });
        
          // Adicione a camada de vetor dos pontos ao mapa
          map.addLayer(pointLayer_sel);
          displaySelectedResult(selectedValue);
        });
        // Exibir o menu dropdown na div com id "paginacao"
        $('#paginacao').empty().append(dropdown).append('&nbsp;&nbsp;&nbsp;(' + response.rows.length + ' resultados)');
        // Exibir o primeiro resultado por padrão (opcional)
        if (response.rows.length > 0) {
          dropdown.val(JSON.stringify(response.rows[response.rows.length-1]));
          displaySelectedResult(response.rows[response.rows.length-1]);
        }
      } else {
        // Se não houver resultados, você pode exibir uma mensagem na tabela
        $('#idsolRow td').html('Nenhum resultado encontrado.');
        $('#paginacao').empty(); // Limpar o menu dropdown
      }
    },
    error: function (error) {
      console.error('Erro ao fazer a solicitação:', error);
    },
  });
});

// Função para exibir um resultado selecionado
function displaySelectedResult(result) {      
  
  // Criar a tabela com o layout personalizado
  const table = $('<table>', {
    class: 'table custom-table-width rounded-table small-table',
  });

  const tbody = $('<tbody>');

  // Mapeamento de alias para nomes de colunas
  for (const key in result) {
    if (columnAlias.hasOwnProperty(key)) {
      const row = $('<tr>', {
        id: key + 'Row',
      });
      const columnName = columnAlias[key];
      const cell = $('<td>', {
        class: 'small-font',
        html: '<b>' + columnName + ':</b> ' + result[key],
      });
      row.append(cell);
      tbody.append(row);
    }
  }
  table.append(tbody);

  // Exibir a tabela na div com id "resultados"
  $('#resultados').html(table);

  // Limpar campos sem dados e preencher com 0
  for (const key in fieldCellIds) {
      const cellId = fieldCellIds[key];
      $('#' + cellId).html('0'); // Preencher com 0 se o valor estiver em branco
    }

  // Preencher células adicionais com valores dos campos adicionais
  for (const key in result) {
      if (fieldCellIds.hasOwnProperty(key)) {
        let cellValue = result[key] !== null && result[key] !== undefined ? result[key] : '0';
        
        // Converter o valor para número
        let numericValue = parseFloat(cellValue);
        
        // Verificar se o valor é um número inteiro
        if (numericValue % 1 === 0) {
          // Se for inteiro, não usar toFixed()
          cellValue = numericValue.toString();
        } else {
          // Se for decimal, usar toFixed() com 2 casas decimais
          cellValue = numericValue.toFixed(2).replace(/\./g, ',');
        }
        
        $('#' + fieldCellIds[key]).html(cellValue);
      }
    }
    
  // Soma dos campos desejados
  veg_nativa.lulc_formacaoflorestal = parseFloat(result.lulc_formacaoflorestal) || 0;
  veg_nativa.lulc_formacaosavanica = parseFloat(result.lulc_formacaosavanica) || 0;
  veg_nativa.lulc_mangue = parseFloat(result.lulc_mangue) || 0;
  veg_nativa.lulc_florestaalagavel = parseFloat(result.lulc_florestaalagavel) || 0;
  veg_nativa.lulc_campoalagadoeareapantanosa = parseFloat(result.lulc_campoalagadoeareapantanosa) || 0;
  veg_nativa.lulc_formacaocampestre = parseFloat(result.lulc_formacaocampestre) || 0;
  veg_nativa.lulc_pastagem = parseFloat(result.lulc_pastagem) || 0;
  veg_nativa.lulc_restingaarborea = parseFloat(result.lulc_restingaarborea) || 0;
  veg_nativa.lulc_restingaherbacea = parseFloat(result.lulc_restingaherbacea) || 0;           
  lav_perenes.lulc_cafe = parseFloat(result.lulc_cafe) || 0;
  lav_perenes.lulc_citrus = parseFloat(result.lulc_citrus) || 0;
  lav_perenes.lulc_outraslavourasperenes = parseFloat(result.lulc_outraslavourasperenes) || 0;
  outras_lav_temporarias.lulc_arroz = parseFloat(result.lulc_arroz) || 0;
  outras_lav_temporarias.lulc_algodao = parseFloat(result.lulc_algodao) || 0;
  outras_lav_temporarias.lulc_outraslavourastemporarias = parseFloat(result.lulc_outraslavourastemporarias) || 0;

  // Calcular as somas totais
  const veg_nativa_somaTotal = Object.values(veg_nativa).reduce((acc, curr) => acc + curr, 0);       
  const lav_perenes_somaTotal = Object.values(lav_perenes).reduce((acc, curr) => acc + curr, 0);
  const outras_lav_temporarias_somaTotal = Object.values(outras_lav_temporarias).reduce((acc, curr) => acc + curr, 0);

  // Exibir as somas nas células
  $('#veg_nativa_tab').html(veg_nativa_somaTotal.toFixed(2).replace(/\./g, ',')); // Arredondar para 2 casas decimais
  $('#lav_perenes_tab').html(lav_perenes_somaTotal.toFixed(2).replace(/\./g, ',')); // Arredondar para 2 casas decimais
  $('#outras_lav_temporarias_tab').html(outras_lav_temporarias_somaTotal.toFixed(2).replace(/\./g, ',')); // Arredondar para 2 casas decimais  
}
  
// Adicione um ouvinte de evento 'pointermove' ao mapa
map.on('pointermove', function (posicaodomouse) {
  const coordinate = posicaodomouse.coordinate;
  const viewResolution = /** @type {number} */ (view.getResolution());
  const url = info_municipios.getFeatureInfoUrl(
    posicaodomouse.coordinate,
    viewResolution,
      'EPSG:4326',
      {'INFO_FORMAT': 'application/json',
      'propertyName': 'nm_mun,sigla_uf',
      'exclude_nodata_result': 'true'},
    );
    fetch(url)
    .then((resp) => resp.json())
    .then(function(resposta) {
      const var1 = resposta['features'];
      if (var1 && var1.length > 0) { // Verificar se var1 está definida e não vazia
        const var2 = var1[0];
      const var3 = var2['properties']
      const nome_municipio = var3['nm_mun'] || 0;
      const uf_municipio = var3['sigla_uf'] || 0        

           
      posicao_text.innerHTML = `        
      <b>Município:</b> &nbsp;${nome_municipio} (${uf_municipio})<br>
      <b>Latitude:</b> &nbsp;${coordinate[1].toFixed(4)}<br>
      <b>Longitude:</b> &nbsp;${coordinate[0].toFixed(4)}<br>
      `
    } else {

    }
    })
});   

map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const viewResolution = /** @type {number} */ (view.getResolution());
  const url = info_torres.getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
      'EPSG:4326',
      {'INFO_FORMAT': 'application/json',
      'propertyName': 'geom,idsol,fase,cliente,fazenda,dealer,dataativacao,projeto,municipio,uf,status,cap_ton_7km,qto_armzs_7km,assent_area_7km,assent_qtd_7km,ti_area_7km,ti_qtd_7km,ucus_area_7km,ucus_qtd_7km,ucpi_area_7km,ucpi_qtd_7km,car_areamedia,car_qtd_7km,sigef_areamedia,sigef_qtd_7km,snci_areamedia,snci_qtd_7km,usinas_qtd_7km,frigorificos_qtd_7km,lulc_formacaoflorestal,lulc_formacaosavanica,lulc_mangue,lulc_florestaalagavel,lulc_silvicultura,lulc_campoalagadoeareapantanosa,lulc_formacaocampestre,lulc_outrasformacoesnaoflorestais,lulc_pastagem,lulc_cana,lulc_areaurbanizada,lulc_apicum,lulc_riolagoeoceano,lulc_soja,lulc_arroz,lulc_outraslavourastemporarias,lulc_cafe,lulc_citrus,lulc_outraslavourasperenes,lulc_restingaarborea,lulc_restingaherbacea,lulc_algodao',
      'exclude_nodata_result': 'true'},
    );
    fetch(url)
    .then((resp) => resp.json())
    .then(function(resposta) {
      const var1 = resposta['features'];
      if (var1 && var1.length > 0) { // Verificar se var1 está definida e não vazia
        const var2 = var1[0];
        const geometria = var2['geometry']; // Acesso à geometria
      const var3 = var2['properties']
      const IdSol = var3['idsol'] || 0;
      const Cliente = var3['cliente'] || 0;
      const Projeto = var3['projeto'] || 0;
      const Fazenda = var3['fazenda'] || 0;   
      const Dealer = var3['dealer'] || 0;
      const DataDeAtivacao = var3['dataativacao'] || 0;
      const Municipio = var3['municipio'] || 0;
      const UF = var3['uf'] || 0;
      const Fase = var3['fase'] || 0;
      const Status = var3['status'] || '-';
      const cap_ton_7km = var3['cap_ton_7km'] || 0;
      const qto_armzs_7km = var3['qto_armzs_7km'] || 0;
      const assent_area_7km = var3['assent_area_7km'] || 0;
      const assent_qtd_7km = var3['assent_qtd_7km'] || 0;
      const ti_area_7km = var3['ti_area_7km'] || 0;
      const ti_qtd_7km = var3['ti_qtd_7km'] || 0;
      const ucus_area_7km = var3['ucus_area_7km'] || 0;
      const ucus_qtd_7km = var3['ucus_qtd_7km'] || 0;
      const ucpi_area_7km = var3['ucpi_area_7km'] || 0;
      const ucpi_qtd_7km = var3['ucpi_qtd_7km'] || 0;
      const car_areamedia = var3['car_areamedia'] || 0;
      const car_qtd_7km = var3['car_qtd_7km'] || 0;
      const sigef_areamedia = var3['sigef_areamedia'] || 0;
      const sigef_qtd_7km = var3['sigef_qtd_7km'] || 0;
      const snci_areamedia = var3['snci_areamedia'] || 0;
      const snci_qtd_7km = var3['snci_qtd_7km'] || 0;
      const usinas_qtd_7km = var3['usinas_qtd_7km'] || 0;
      const frigorificos_qtd_7km = var3['frigorificos_qtd_7km'] || 0;
      const veg_nativa = var3['lulc_formacaoflorestal']+var3['lulc_formacaosavanica']+var3['lulc_mangue']+var3['lulc_florestaalagavel']+var3['lulc_campoalagadoeareapantanosa']+var3['lulc_formacaocampestre']+var3['lulc_outrasformacoesnaoflorestais']+var3['lulc_restingaarborea']+var3['lulc_restingaherbacea'] || 0;
      const lulc_silvicultura = var3['lulc_silvicultura'] || 0;
      const lulc_pastagem = var3['lulc_pastagem'] || 0;
      const lulc_cana = var3['lulc_cana'] || 0;
      const lulc_areaurbanizada = var3['lulc_areaurbanizada'] || 0;
      const lulc_riolagoeoceano = var3['lulc_riolagoeoceano'] || 0;
      const lulc_soja = var3['lulc_soja'] || 0;
      const lav_perenes = var3['lulc_outraslavourasperenes']+var3['lulc_cafe']+var3['lulc_citrus'] || 0;
      const outras_lav_temporarias = var3['lulc_algodao']+var3['lulc_outraslavourastemporarias']+var3['lulc_arroz'] || 0;
      const div1 = document.getElementById('rel_torre_tab');
      map.removeLayer(vectorLayer); 
      map.removeLayer(pointLayer); 
      map.removeLayer(pointLayer_sel);
      map.removeLayer(pointLayer_sel_v2);     
      const coordenadas = geometria.coordinates
      const coordinates = coordenadas[0]       
     // Crie uma camada de recursos para adicionar o ponto ao mapa
    pointLayer_sel_v2 = new ol.layer.Vector({
      source: new ol.source.Vector(),
      projection: 'EPSG:4326'
    });
    
    // Defina um estilo para o ponto (ícone personalizado)
    const iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: '/images/icon_black.png', // Caminho para a imagem PNG
        scale: 1, // Tamanho do ícone
      }),
});

const pointFeature = new ol.Feature({
  geometry: new ol.geom.Point(coordinates),
  projection: 'EPSG:4326'
});

// Aplique o estilo ao recurso
pointFeature.setStyle(iconStyle);


// Adicione o recurso à camada de recursos
pointLayer_sel_v2.getSource().addFeature(pointFeature);

// Adicione a camada de recursos ao mapa
map.addLayer(pointLayer_sel_v2);

rel_torre_tab.innerHTML = `
<div id="resultados">        
<table class="table custom-table-width rounded-table small-table">                
        <tbody>
            <tr id="idsolRow">
                <td class="small-font"><b>ID SOL:</b> ${IdSol}</td>
            </tr>
            <tr id="clienteRow">
                <td class="small-font"><b>Cliente:</b> ${Cliente}</td>
            </tr>   
            <tr id="municipioRow">
                <td class="small-font"><b>Município:</b> ${Municipio}</td>
            </tr>  
            <tr id="ufRow">
                <td class="small-font"><b>UF:</b> ${UF}</td>
            </tr>  
            <tr id="faseRow">
              <td class="small-font"><b>Fase:</b> ${Fase}</td>
          </tr>
            <tr id="statusRow">
                <td class="small-font"><b>Status:</b> ${Status}</td>
            </tr>
            <tr id="projetoRow">
                <td class="small-font"><b>Projeto:</b> ${Projeto}</td>
            </tr>
            <tr id="fazendaRow">
                <td class="small-font"><b>Fazenda:</b> ${Fazenda}</td>
            </tr>
            <tr id="dealerRow">
                <td class="small-font"><b>Dealer:</b> ${Dealer}</td>
            </tr>
            <tr id="ativacaoRow">
                <td class="small-font"><b>Data de ativação:</b> ${DataDeAtivacao}</td>
            </tr>
        </tbody>
    </table>
    </div>
    <div id="paginacao">
  </div>
`
const resultados_10km = document.getElementById('resultados_10km');

resultados_10km.innerHTML = `
<table class="table custom-table-width rounded-table small-table">
        <thead>
            <tr>
                <th class="small-font">Base fundiária</th>
                <th class="small-font text-center">Qtd. imóveis</th>
                <th class="small-font text-center">Tamanho médio (ha)</th>
              </tr>
        </thead>
        <tbody>
            <tr>
                <td class="small-font">CAR</td>
                <td id="car_qtd_7km_tab" class="small-font text-center" >${car_qtd_7km}</td>
                <td id="car_areamedia_tab" class="small-font text-center">${car_areamedia.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">SIGEF</td>
                <td id="sigef_qtd_7km_tab" class="small-font text-center">${sigef_qtd_7km}</td>
                <td id="sigef_areamedia_tab" class="small-font text-center">${sigef_areamedia.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">SNCI</td>
                <td id="snci_qtd_7km_tab" class="small-font text-center">${snci_qtd_7km}</td>
                <td id="snci_areamedia_tab" class="small-font text-center">${snci_areamedia.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
        </tbody>
    </table>
    <table class="table custom-table-width rounded-table small-table">
        <tbody>
            <tr>
                <td class="small-font"><b>Silos/armazens (qtd):</b></td>
                <td id="qto_armzs_7km_tab" class="small-font">${qto_armzs_7km}</td>
            </tr>
            <tr>
                <td class="small-font"><b>Capacidade de armazenamento (ton): </b> </td>
                <td id="cap_ton_7km_tab" class="small-font">${cap_ton_7km.toFixed(2).replace(/\./g, ',')}</td>
            </tr>   
            <tr>
                <td class="small-font"><b>Usinas sucroalcooleiras (qtd):</b> </td>
                <td id="usinas_qtd_7km_tab" class="small-font">${usinas_qtd_7km}</td>
            </tr>
            <tr>
                <td class="small-font"><b>Frigoríficos-SIF (qtd): </td>
                <td id="frigorificos_qtd_7km_tab" class="small-font">${frigorificos_qtd_7km}</td>
            </tr>
        </tbody>
    </table>
    <table class="table custom-table-width rounded-table small-table">
        <thead>
            <tr>
                <th class="small-font">Uso/cobertura do solo (2022)</th>
                <th class="small-font">Área (ha)</th>
              </tr>
        </thead>
        <tbody>
            <tr>
                <td class="small-font">Soja</td>
                <td id="lulc_soja_tab" class="small-font" >${lulc_soja.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">Outras lavouras temporárias</td>
                <td id="outras_lav_temporarias_tab" class="small-font">${outras_lav_temporarias.toFixed(2).replace(/\./g, ',')}</td>
            </tr>   
            <tr>
                <td class="small-font">Cana</td>
                <td id="lulc_cana_tab" class="small-font">${lulc_cana.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">Lavouras perenes</td>
                <td id="lav_perenes_tab" class="small-font">${lav_perenes.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">Pastagem</td>
                <td id="lulc_pastagem_tab" class="small-font">${lulc_pastagem.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">Silvicultura</td>
                <td id="lulc_silvicultura_tab" class="small-font">${lulc_silvicultura.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">Área urbanizada</td>
                <td id="lulc_areaurbanizada_tab" class="small-font">${lulc_areaurbanizada.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">Água</td>
                <td id="lulc_riolagoeoceano_tab" class="small-font">${lulc_riolagoeoceano.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">Vegetação nativa</td>
                <td id="veg_nativa_tab" class="small-font">${veg_nativa.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
        </tbody>
    </table>
    <table class="table custom-table-width rounded-table small-table">
        <thead>
            <tr>
                <th class="small-font">Categoria territorial</th>
                <th class="small-font">Quantidade</th>
                <th class="small-font">Área (ha)</th>
              </tr>
        </thead>
        <tbody>
            <tr>
                <td class="small-font">Assentamento</td>
                <td id="assent_qtd_7km_tab" class="small-font text-center">${assent_qtd_7km}</td>
                <td id="assent_area_7km_tab" class="small-font">${assent_area_7km.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">Terra indígena</td>
                <td id="ti_qtd_7km_tab" class="small-font text-center">${ti_qtd_7km}</td>
                <td id="ti_area_7km_tab" class="small-font">${ti_area_7km.toFixed(2).replace(/\./g, ',')}</td>
                
            </tr>   
            <tr>
                <td class="small-font">Unidade de conservação (PI)</td>
                <td id="ucpi_qtd_7km_tab" class="small-font text-center"> ${ucpi_qtd_7km}</td>
                <td id="ucpi_area_7km_tab" class="small-font"> ${ucpi_area_7km.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
            <tr>
                <td class="small-font">Unidade de conservação (US)</td>
                <td id="ucus_qtd_7km_tab" class="small-font text-center"> ${ucus_qtd_7km}</td>
                <td id="ucus_area_7km_tab" class="small-font"> ${ucus_area_7km.toFixed(2).replace(/\./g, ',')}</td>
            </tr>
        </tbody>
    </table>
    `
} else {
}
})
}); 