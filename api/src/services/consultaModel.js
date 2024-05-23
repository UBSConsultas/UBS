const db = require('../db')

module.exports ={
     // Model
buscarTodasConsul: async () => {
  return new Promise((aceito, recusado) => {
      const query = `
          SELECT 
              paciente.paci_nome, 
              paciente.paci_cpf, 
              ubs.ubs_nome, 
              areas_medicas.area_nome, 
              datas_horarios.horarios_dia, 
              datas_horarios.horarios_horarios,
              consulta.consul_estado
          FROM 
              consulta
          INNER JOIN paciente ON consulta.paci_id = paciente.paci_id
          INNER JOIN ubs ON consulta.ubs_id = ubs.ubs_id
          INNER JOIN areas_medicas ON consulta.area_id = areas_medicas.area_id
          INNER JOIN datas_horarios ON consulta.horarios_id = datas_horarios.horarios_id;
      `;

      db.query(query, (error, results) => {
          if (error) {
              recusado({ error: 'Ocorreu um erro ao buscar as consultas.', details: error });
              return;
          }

          aceito(results);
      });
  });
},

      // Modelo
umaconsul: (paci_id) => {
  return new Promise((aceito, recusado) => {
      const query = `
          SELECT 
          paciente.paci_nome, 
          paciente.paci_cpf, 
          ubs.ubs_nome, 
          areas_medicas.area_nome, 
          datas_horarios.horarios_dia, 
          datas_horarios.horarios_horarios,
          consulta.consul_estado
      FROM 
          consulta
      INNER JOIN paciente ON consulta.paci_id = paciente.paci_id
      INNER JOIN ubs ON consulta.ubs_id = ubs.ubs_id
      INNER JOIN areas_medicas ON consulta.area_id = areas_medicas.area_id
      INNER JOIN datas_horarios ON consulta.horarios_id = datas_horarios.horarios_id
          WHERE
              consulta.paci_id = ?;
      `;

      db.query(query, [paci_id], (error, results) => {
          if (error) {
              recusado({ error: 'Ocorreu um erro ao buscar a consulta.', details: error });
              return;
          }

          aceito(results);
      });
  });
},



    criarConsulta: (paci_id, ubs_id, area_id, horarios_id, estado) => {
        return new Promise((aceito, recusado) => {
            const query = 'INSERT INTO consulta (paci_id, ubs_id, area_id, horarios_id, consul_estado) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [paci_id, ubs_id, area_id, horarios_id, estado], (error, results) => {
                if (error) {
                    recusado({ error: 'Erro ao criar a consulta.', details: error });
                    return;
                }
                aceito(results.insertId); // Retorna o ID da consulta criada
            });
        });
    },

}
