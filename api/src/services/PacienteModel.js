const db = require('../db')

module.exports = {
buscarTodos: () =>{        // -------------------------LISTAR TODOS--------------------------------- //
    return new Promise((aceito, recusado)=>{

        db.query('SELECT * FROM paciente', (error, results)=>{
            if(error) { recusado(error); return; }
            aceito(results);
        });
    });
},

buscarUm: (paci_id) =>{        // ----------------------------LISTAR SOMENTE UM ------------------------------//
    return new Promise((aceito, recusado) => {
        
        db.query ('SELECT * FROM paciente WHERE paci_id = ?', [paci_id], (error, results)=>{
            if(error) { recusado(error); return; }
            if(results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
},
inserir: (paci_nome, paci_data_nascimento, paci_CPF, paci_cel, paci_email, paci_endereco) => {
    return new Promise((aceito, recusado) => {
        db.query('INSERT INTO paciente (paci_nome, paci_data_nascimento, paci_CPF, paci_cel, paci_email, paci_endereco) VALUES (?,?,?,?,?,?)',
            [paci_nome, paci_data_nascimento, paci_CPF, paci_cel, paci_email, paci_endereco],
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

alterar: (paci_id, paci_nome, paci_data_nascimento, paci_CPF, paci_cel,paci_email, paci_endereco) =>{        // ----------------------------ALTERAR DADOS------------------------------//
    return new Promise((aceito, recusado) => {
        
        db.query ('UPDATE paciente SET paci_nome = ?, paci_data_nascimento = ?, paci_CPF = ?, paci_cel = ?, paci_email = ?, paci_endereco= ? WHERE paci_id = ?',
        [ paci_id,paci_nome, paci_data_nascimento, paci_CPF, paci_cel, paci_email, paci_endereco], 
        (error, results)=>{
            if(error) { recusado(error); return; }
               aceito(results);
            
            }
        );
    });
},

excluir: (paci_id) =>{        // -------------------------EXCLUIR DADOS--------------------------------- //
    return new Promise((aceito, recusado)=>{

        db.query('DELETE FROM paciente WHERE paci_id = ?',[paci_id],(error, results)=>{
            if(error) { recusado(error); return; }
            aceito(results);
        });
    });
  }
}