const db = require('../db')

module.exports = {
    buscarTodos: () =>{        // -------------------------LISTAR TODOS--------------------------------- //
        return new Promise((aceito, recusado)=>{
    
            db.query('SELECT * FROM recepcionista', (error, results)=>{
                if(error) { recusado(error); return; }
                aceito(results);
            });
        });
    },
    

// Model

buscarUm: (recep_id) =>{        // ----------------------------LISTAR SOMENTE UM ------------------------------//
    return new Promise((aceito, recusado) => {
        
        db.query ('SELECT * FROM recepcionista WHERE recep_id = ?', [recep_id], (error, results)=>{
            if(error) { recusado(error); return; }
            if(results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
        });
    });
},
inserir: (recep_nome, recep_CPF, recep_cel) => {
    return new Promise((aceito, recusado) => {
        db.query('INSERT INTO recepcionista (recep_nome, recep_CPF, recep_cel) VALUES (?,?,?)',
            [recep_nome, recep_CPF, recep_cel],
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