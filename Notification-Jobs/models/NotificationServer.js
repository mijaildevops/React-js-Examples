// DB model la fecha de la consulta debe ser DATEONLY de lo contratrario sequelize añadira la hora y al realizar la consulta no se obtendra datos
module.exports = (sequelize, type) => {
    return sequelize.define ('NotificacionServer', {
        UserId: type.INTEGER,
        DoctorId: type.INTEGER,
        FechaConsulta: type.DATEONLY,
        HoraConsulta: type.TIME,
        Status: type.INTEGER
    })
} 