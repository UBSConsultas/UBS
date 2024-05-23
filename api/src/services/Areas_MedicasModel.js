const db = require ('../db')

module.exports = {
  
buscarTodos: () =>{        // -------------------------LISTAR TODAS AS AREAS--------------------------------- //
    return new Promise((aceito, recusado)=>{

        db.query('SELECT * from areas_medicas', (error, results)=>{
            if(error) { recusado(error); return; }
            aceito(results);
        });
    });
},

// Model
// Model
// Model
buscarUm: (area_id) => {
  return new Promise((aceito, recusado) => {
      db.query(
          'SELECT datas_horarios.horario_id, datas_horarios.data, datas_horarios.horario ' +
          'FROM datas_horarios ' +
          'INNER JOIN horarios_areas ON datas_horarios.horario_id = horarios_areas.horario_id ' +
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
},
}
