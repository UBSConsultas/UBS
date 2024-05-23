const Areas_MedicasModel = require ('../services/Areas_MedicasModel')

module.exports = {
    buscarTodos: async (req, res)=>{                  // -------------------------LISTAR TODAS AS AREAS--------------------------------- //
        let json = { error: '', result: [] };

        let areas_medicas = await Areas_MedicasModel.buscarTodos();
        let areasMedicasMap = new Map();
        
        for (let i in areas_medicas) {
          const area_id = areas_medicas[i].areas_id;
        
          if (!areasMedicasMap.has(area_id)) {
            areasMedicasMap.set(area_id, {
              area_id: area_id,
              area_nome: areas_medicas[i].area_nome,
              area_numero_de_consultas: areas_medicas[i].area_numero_de_consultas,
              areas_descricao: areas_medicas[i].areas_descricao,
              datas_horarios: [],
            });
          }
        
          areasMedicasMap.get(area_id).datas_horarios.push({
            datas_horarios_datas: areas_medicas[i].datas_horarios_datas,
           
          });
        }
        
        json.result = [...areasMedicasMap.values()]; // Converte o mapa em um array de objetos
        
        res.json(json);
        
        
    },

   // Controller
// Controller
buscarUm: async (req, res) => {
  let json = { error: '', result: [] };

  try {
      let area_id = req.params.area_id; // Obtém o area_id a partir dos parâmetros da requisição

      // Chama a função do model para buscar os horários associados à area_id especificada
      let horarios = await HorariosModel.buscarUm(area_id);

      // Formata a resposta para incluir os dados dos horários
      json.result = horarios;

      res.json(json);
  } catch (error) {
      // Se ocorrer um erro, envie uma resposta de erro
      json.error = 'Erro ao buscar os horários.';
      res.status(500).json(json);
  }
}
}
   
