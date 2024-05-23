const MedicoModel = require('../services/MedicoModel');

module.exports = {

  
buscarTodos: async (req, res) => {
    // -------------------------LISTAR TODOS--------------------------------- //
    let json = { error: '', result: [] };

    try {
        let medicos = await MedicoModel.buscarTodos();

        for (let i in medicos) {
            json.result.push({
                medico_id: medicos[i].medico_id,
                medico_nome: medicos[i].medico_nome,
                medico_CPF: medicos[i].medico_CPF,
                medico_CRM: medicos[i].medico_CRM,
                medico_cel: medicos[i].medico_cel,
                area_nome: medicos[i].area_nome 
            });
        }

        res.json(json);
    } catch (error) {
        json.error = 'Erro ao buscar todos os médicos.';
        res.json(json);
    }
},

    
    // Controller
buscarUm: async (req, res) => {
    // ----------------------------LISTAR SOMENTE UM ------------------------------//
    let json = { error: '', result: {} };

    try {
        let medico_id = req.params.medico_id; // Certifique-se de usar o parâmetro correto

        let medico = await MedicoModel.buscarUm(medico_id);

        if (medico) {
            json.result = {
                medico_id: medico.medico_id,
                medico_nome: medico.medico_nome,
                medico_CPF: medico.medico_CPF,
                medico_CRM: medico.medico_CRM,
                medico_cel: medico.medico_cel,
                area_nome: medico.area_nome // Adicionei esta linha para incluir o nome da área
            };
        } else {
            json.error = 'Médico não encontrado.';
        }

        res.json(json);
    } catch (error) {
        json.error = 'Erro ao buscar o médico.';
        res.json(json);
    }
},

    inserir:  async (req, res) => {         // ----------------------------INSERIR DADOS------------------------------//
        let json ={error:'', result:{}};

        let nome = req.body.medico_nome;
        let CPF = req.body.medico_CPF;
        let CRM = req.body.medico_CRM;
        let telefone = req.body.medico_cel;
        let area = req.body.area_id;


        if (nome && CPF && CRM && telefone && area){
            let medico_id = await MedicoModel.inserir(nome, CPF, CRM, telefone, area);
            json.result = {
                medico_id: medico_id,
                nome,
                CPF,
                CRM,
                telefone,
                area
            };

        }else{
            json.error = 'Campos nao enviados';
        }

        res.json(json);
    },

    
}