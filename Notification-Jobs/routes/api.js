// archivo para redireccionar todas las peticiones hechas a travez de la Url '/Notificaciones'
// cuando se realice uan peticion se procesara desde './api/Notificaciones'
const router = require('express').Router();

const ApiNotificationRouter = require('./api/Notificaciones')

router.use('/Notificaciones', ApiNotificationRouter);

module.exports = router; 