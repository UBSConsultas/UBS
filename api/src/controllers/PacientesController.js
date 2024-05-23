const PacienteModel = require('../services/PacienteModel');

module.exports = {

    buscarTodos: async (req, res)=>{                  // -------------------------LISTAR TODOS--------------------------------- //
        let json ={error:'', result:[]};

        let paciente = await PacienteModel.buscarTodos();   

        for(let i in paciente){
            json.result.push({
                paciente_id: paciente[i].paci_id,
                paciente_nome: paciente[i].paci_nome,
                paciente_data_nascimento: paciente[i].paci_data_nascimento,
                paciente_CPF: paciente[i].paci_CPF,
                paciente_cel: paciente[i].paci_cel,
                paciente_email: paciente[i].paci_email,
                paciente_endereco: paciente[i].paci_endereco,
            });
        }
        res.json(json);
    },
    
    buscarUm: async (req, res)=> {      // ----------------------------LISTAR SOMENTE UM ------------------------------//
        let json ={error:'', result:{}};

        let paci_id = req.params.paci_id;
        let paciente = await PacienteModel.buscarUm(paci_id);

        if(paciente){
            json.result = paciente;
        }

        res.json(json);
    },

    inserir:  async (req, res) => {         // ----------------------------INSERIR DADOS------------------------------//
        let json ={error:'', result:{}};

        let nome = req.body.paci_nome;
        let dataNascimento = req.body.paci_data_nascimento;
        let CPF = req.body.paci_CPF;
        let telefone = req.body.paci_cel;
        let email = req.body.paci_email;
        let endereco = req.body.paci_endereco;


        if (nome && dataNascimento && CPF && telefone && email && endereco){
            let paci_id = await PacienteModel.inserir(nome, dataNascimento, CPF, telefone, email,endereco);
            json.result = {
                paci_id: paci_id,
                nome,
                dataNascimento,
                CPF,
                telefone,
                email,
                endereco
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },

    alterar:  async (req, res) => {         // ----------------------------ALTERAR DADOS------------------------------//
        let json ={error:'', result:{}};

        let id = req.params.paci_id;
        let nome = req.body.paci_nome;
        let dataNascimento = req.body.paci_data_nascimento;
        let CPF = req.body.paci_CPF;
        let telefone = req.body.paci_cel;
        let email = req.body.paci_email;
        let endereco = req.body.paci_endereco;
        if (id && nome && dataNascimento && CPF && telefone && email && endereco){
            await PacienteModel.alterar(id, nome, dataNascimento, CPF, telefone, email, endereco);
            json.result = {
                id,
                nome,
                dataNascimento,
                CPF,
                telefone,
                email,
                endereco
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },

    excluir:  async (req, res) => {  
        let json ={error:'', result:{}};

        await PacienteModel.excluir(req.params.paci_id);

        res.json(json);

    },
}