const express = require('express');
const router = express.Router();


const PacientesController = require('./controllers/PacientesController');
const MedicoController = require('./controllers/MedicoController');
const Areas_MedicasController = require('./controllers/Areas_MedicasController');
const consultaPacienteController = require('./controllers/consultaPacienteController');
const UbsController = require ('./controllers/UbsController');
const RecepcionistaController = require('./controllers/RecepcionistaController');
const HorarioController = require('./controllers/HorarioController');


//----------------------------CONSULTA-----------------------------------//
router.get('/Consultas', consultaPacienteController.buscarTodasConsul);
router.get('/Consulta/:paci_id', consultaPacienteController.umaconsul);
router.post('/Consulta', consultaPacienteController.criarConsulta);


//----------------------------RECEPCIONISTA-----------------------------------//
router.get('/Recep', RecepcionistaController.buscarTodos);
router.get('/Recep/:recep_id', RecepcionistaController.buscarUm);
router.post('/Recep', RecepcionistaController.inserir);


//----------------------------UBS-----------------------------------//
router.get('/Ubs', UbsController.buscarTodos);
router.get('/Ubs/:ubs_id', UbsController.buscarUm);

//----------------------------MEDICO-----------------------------------//
router.get('/Medicos', MedicoController.buscarTodos);
router.get('/Medico/:medico_id', MedicoController.buscarUm);
router.post('/Medico', MedicoController.inserir);



//----------------------------PACIENTE-----------------------------------//
router.get('/Pacientes', PacientesController.buscarTodos);
router.get('/Paciente/:paci_id', PacientesController.buscarUm);
router.post('/Paciente', PacientesController.inserir);
router.put('/Paciente/:paci_id', PacientesController.alterar);
router.delete('/Paciente/:paci_id', PacientesController.excluir);


//----------------------------HORARIOS-----------------------------------//
router.get('/Horario/:area_id', HorarioController.buscarUm);

//----------------------------AREAS MEDICAS-----------------------------------//
//router.get('/areas', Areas_MedicasController.buscarTodos);
router.get('/areas/:area_id', Areas_MedicasController.buscarUm);


module.exports = router;

