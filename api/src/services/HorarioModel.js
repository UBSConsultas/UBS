const db = require ('../db')

module.exports = {
  

// Model
buscarUm: (area_id) => {
    return new Promise((aceito, recusado) => {
        db.query(
            'SELECT datas_horarios.horarios_id, datas_horarios.horarios_dia, datas_horarios.horarios_horarios ' +
            'FROM datas_horarios ' +
            'INNER JOIN horarios_areas ON datas_horarios.horarios_id = horarios_areas.horarios_id ' +
            'WHERE horarios_areas.area_id = ?',
            [area_id],
            (error, results) => {
                if (error) {
                    recusado({ error: 'Erro ao buscar os horários.', details: error });
                    return;
                }
  
                aceito(results);
            }
        );
    });
  }
  
}
