const router = require('express').Router();
const moment = require('moment');

const { NotificationServer } = require('../../db');
const { where } = require('sequelize');

// Example consulta con parametros
/* router.get('/:Status', async (req, res) => {
    var Status = req.params.status;
    const notificaciones = await NotificationServer.findAll({Status: Status, where: {Status: req.params.Status} });
    console.log(req.params.Status);
    res.json(notificaciones)
}); */ 

router.get('/', async (req, res) => {
   
    // obtenemos el dia actual y damos formato
    var now = moment();
    var FechaActual = moment().format('YYYY-MM-DD');

    // realizamos consulta al DB enviando como parametro la fecha actual y el estatus de la notificacion
    // aquellas que sean de dias diferentes no se tomaran en cuenta
    // el estatus 0 indica que la notificaion no ha sido enviada
    const notificaciones = await NotificationServer.findAll({ where: {FechaConsulta: FechaActual, Status: 0} });
    res.json(notificaciones)

    
});

module.exports = router;
 