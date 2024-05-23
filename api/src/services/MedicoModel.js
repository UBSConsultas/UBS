const db = require('../db')

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, recusado) => {
            db.query(
                'SELECT m.medico_id, m.medico_nome, m.medico_CPF, m.medico_CRM, m.medico_cel, a.area_nome ' +
                'FROM medico m ' +
                'INNER JOIN areas_medicas a ON m.area_id = a.area_id',
                (error, results) => {
                    if (error) {
                        recusado(error);
                        return;
                    }
                    aceito(results);
                }
            );
        });
    },
    

// Model
buscarUm: (medico_id) => {
    return new Promise((aceito, recusado) => {
        db.query(
            'SELECT m.medico_id, m.medico_nome, m.medico_CPF, m.medico_CRM, m.medico_cel, a.area_nome ' +
            'FROM medico m ' +
            'INNER JOIN areas_medicas a ON m.area_id = a.area_id ' +
            'WHERE m.medico_id = ?',
            [medico_id],
            (error, results) => {
                if (error) {
                    recusado({ error: 'Erro ao buscar o médico.', details: error });
                    return;
                }

                if (results.length > 0) {
                    aceito(results[0]);
                } else {
                    recusado(null);
                }
            }
        );
    });
},

inserir: (medico_nome, medico_CPF, medico_CRM, medico_cel, area_id) => {
    return new Promise((aceito, recusado) => {
        db.query('INSERT INTO medico (medico_nome, medico_CPF, medico_CRM, medico_cel, area_id) VALUES (?,?,?,?,?)',
            [medico_nome, medico_CPF, medico_CRM, medico_cel, area_id],
            (error, results) => {
                if (error) {
                    recusado(error);
                    return;
                }
                aceito(results.insertId);
            }
        );
    });
},

}