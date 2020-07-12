// archivo que contiene las Url o endpoint 
const axios = require('axios').default;

module.exports = axios.create({
    baseURL: "http://localhost:3700/api/Notificaciones"
})