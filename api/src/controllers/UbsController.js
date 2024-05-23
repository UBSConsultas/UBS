const UbsModel = require('../services/UbsModel');

module.exports = {

  
// Controller
// Controller
// Controller
buscarTodos: async (req, res) => {
    let json = { error: '', result: [] };

    try {
        // Chama a função do model para buscar todas as UBS com os nomes das áreas associadas
        let ubsComAreas = await UbsModel.buscarTodos();

        // Formata a resposta para incluir os dados das UBS e as áreas concatenadas
        for (let i = 0; i < ubsComAreas.length; i++) {
            let ubs = ubsComAreas[i];
            json.result.push({
                ubs_id: ubs.ubs_id,
                ubs_nome: ubs.ubs_nome,
                // Inclua outros campos da tabela Ubs conforme necessário
                areas: ubs.areas // Aqui usamos o resultado da concatenação das áreas
            });
        }

        res.json(json);
    } catch (error) {
        // Se ocorrer um erro, envie uma resposta de erro
        json.error = 'Erro ao buscar todas as UBS.';
        res.status(500).json(json);
    }
},

    // Controller
// Controller
buscarUm: async (req, res) => {
    let json = { error: '', result: {} };

    try {
        let ubs_id = req.params.ubs_id; // Obtém o ubs_id a partir dos parâmetros da requisição

        // Chama a função do model para buscar a UBS com o ubs_id especificado
        let ubs = await UbsModel.buscarUm(ubs_id);

        // Formata a resposta para incluir os dados da UBS e as áreas concatenadas
        if (ubs) {
            json.result = {
                ubs_id: ubs.ubs_id,
                ubs_nome: ubs.ubs_nome,
                areas: ubs.areas // Aqui usamos o resultado da concatenação das áreas
            };
        } else {
            json.error = 'UBS não encontrada.';
        }

        res.json(json);
    } catch (error) {
        // Se ocorrer um erro, envie uma resposta de erro
        json.error = 'Erro ao buscar a UBS.';
        res.status(500).json(json);
    }
},

}