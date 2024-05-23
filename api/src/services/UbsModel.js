const db = require('../db')

module.exports = {
  // Model

buscarTodos: () => {
    return new Promise((aceito, recusado) => {
        db.query(
            'SELECT u.ubs_id, u.ubs_nome, GROUP_CONCAT(a.area_nome SEPARATOR ", ") AS areas ' +
            'FROM Ubs u ' +
            'INNER JOIN tabela_ligacao_ubs t ON u.ubs_id = t.ubs_id ' +
            'INNER JOIN areas_medicas a ON t.area_id = a.area_id ' +
            'GROUP BY u.ubs_id',
            (error, results) => {
                if (error) {
                    recusado({ error: 'Erro ao buscar todas as UBS.', details: error });
                    return;
                }

                aceito(results);
            }
        );
    });
},



    

    
// Model
// Model
buscarUm: (ubs_id) => {
    return new Promise((aceito, recusado) => {
        db.query(
            'SELECT u.ubs_id, u.ubs_nome, GROUP_CONCAT(a.area_nome SEPARATOR ", ") AS areas ' +
            'FROM Ubs u ' +
            'INNER JOIN tabela_ligacao_ubs t ON u.ubs_id = t.ubs_id ' +
            'INNER JOIN areas_medicas a ON t.area_id = a.area_id ' +
            'WHERE u.ubs_id = ? ' +
            'GROUP BY u.ubs_id',
            [ubs_id],
            (error, results) => {
                if (error) {
                    recusado({ error: 'Erro ao buscar a UBS.', details: error });
                    return;
                }

                if (results.length > 0) {
                    aceito(results[0]); // Retorna apenas o primeiro resultado (deve haver apenas um)
                } else {
                    recusado({ error: 'UBS não encontrada.' });
                }
            }
        );
    });
},

}