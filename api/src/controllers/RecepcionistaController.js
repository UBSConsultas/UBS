const RecepcionistaModel = require('../services/RecepcionistaModel');

module.exports = {

    buscarTodos: async (req, res)=>{                  // -------------------------LISTAR TODOS--------------------------------- //
        let json ={error:'', result:[]};

        let recepcionista = await RecepcionistaModel.buscarTodos();  

        for(let i in recepcionista){
            json.result.push({
                recep_id: recepcionista[i].recep_id,
                recep_nome: recepcionista[i].recep_nome,
                recep_CPF: recepcionista[i].recep_CPF,
                recep_cel: recepcionista[i].recep_cel, 
            });
        }
        res.json(json);
    },


    buscarUm: async (req, res)=> {      // ----------------------------LISTAR SOMENTE UM ------------------------------//
        let json ={error:'', result:{}};

        let recep_id = req.params.recep_id;
        let recepcionista = await RecepcionistaModel.buscarUm(recep_id);

        if(recepcionista){
            json.result = recepcionista;
        }

        res.json(json);
    },
    inserir:  async (req, res) => {         // ----------------------------INSERIR DADOS------------------------------//
        let json ={error:'', result:{}};

        let nome = req.body.recep_nome;
        let CPF = req.body.recep_CPF;
        let telefone = req.body.recep_cel;
        


        if (nome &&  CPF && telefone ){
            let recep_id = await RecepcionistaModel.inserir(nome, CPF, telefone);
            json.result = {
                recep_id: recep_id,
                nome,
                CPF,
                telefone
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },

    
}