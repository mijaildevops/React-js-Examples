// libreria para la conexion a la DB
const Sequelize = require('sequelize');

// obteniendo al modelo tabla DB
const NotificacionModel = require('./models/NotificationServer');

// Conexion a la DB
const sequelize = new Sequelize('Notificaciones', 'Qatest', 'Quito.2019', {
    host: '100.97.218.207',
    dialect: 'mysql'
});

const NotificationServer = NotificacionModel(sequelize, Sequelize);

sequelize.sync({ force: false})
.then(() => {
    console.log('Tablas Sincronizadas!')
});

// exportando el modelo para que pueda ser urilizado
module.exports = {
    NotificationServer
}   