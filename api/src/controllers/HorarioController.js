const HorarioModel = require ('../services/HorarioModel')

module.exports = {
   
// Controller
buscarUm: async (req, res) => {
  let json = { error: '', result: [] };

  try {
      let area_id = req.params.area_id; // Obtém o area_id a partir dos parâmetros da requisição

      // Chama a função do model para buscar os horários associados à area_id especificada
      let horarios = await HorarioModel.buscarUm(area_id);

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
   
