// Libreria "node-cron" se utiliza para generar el Job cada minuto
const cron = require('node-cron');
const axios = require ("./util/axios")

const express = require ('express');
const bodyparser = require('body-parser')

const apiRouter = require('./routes/api');

const moment = require('moment');;

const app = express();

require('./db');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

app.use('/api', apiRouter)

// Ruta index
app.get('/', (req, res) => {
   res.send('Task Job')   
});

// Server
app.listen(3700, () => {
    console.log('Server is Running!');

    // Setting del Job los * indican cada cuanto se ejecuta el Job con 6 "*" se realiza cada segundo y con 5 "*" cada Minuto
    cron.schedule("* * * * * *", () => {
        console.log ("Run Job");
        // una vez ejecuta el job, llama a la funcion "GetCitasToNotify"
        JobNotifications.GetCitasToNotify();
    });
}); 

class JobNotifications {

    // Funcion para obtener las posibles citas a notificar
    static async GetCitasToNotify(){
        // Mediante Axios.js (folder util) obtenemos las citas a notificar
        // el endpoint devuelve totas las citas del dia y que el status sea igual a (1)
        const Jobcitas = (await axios.get()).data;
        console.log (Jobcitas);

        // obtenemos la Fecha Actual
        var HoraActual = moment().format('HH:mm:ss');
        console.log('Hora actual: ' + HoraActual)
        // calculamos la hora limite para las notificaciones aquellas que sea mayor a la "HoraLimite" sera descartadas
        let HoraLimite = moment(new Date()).add(+10, 'minutes').format('HH:mm:ss');
        console.log('Hora Limite: ' + HoraLimite)

        // por cada cita recibida se compara las fechas de ser true se envia la notificacion
        var i=0
        for (const Cita in Jobcitas) {
            // cita Actual
            console.log('- CitaID: ' + Jobcitas[i].id)
            if (Jobcitas[i].HoraConsulta >= HoraActual) {
                if (Jobcitas[i].HoraConsulta <= HoraLimite){
                    // Enviando Notificacion al User y Doctor vinculados a la cita
                    console.log('  - La cita esta dentro del periodo de Notificacion')
                    console.log('  - Enviando Notificacion')
                    console.log('     - Hora Consulta: ' + Jobcitas[i].HoraConsulta)
                    console.log('     - Hora Limite:   ' + HoraLimite)
                    console.log('  - Actualizando estatus de la Notificacion')
                    // Ejeutando cambio de status o Delete del registro Notificacion-Cita (Tabla Nueva)
                } else{
                    console.log('  - Cita descartada aun no toca notificacion');
                }
                
              } else {
                // es una cita pasada (esta validacion esta de mas, debido que al enviar se debe eliminar o cambiar el status de cita-notificacion)
                // tabla nueva 
                console.log('Cita descartada');
              }
            i += 1
          } 
    }
}


