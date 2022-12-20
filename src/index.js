const express = require('express');
var cors = require('cors');

const configGlobal = require('./config/config');
var bodyParser = require('body-parser');

const app = express();

//Configuración 
app.set("puerto", configGlobal.PORT);
app.set("json spaces", 2);

//Middleware
app.options('*', cors());
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('Mensaje de Entrada |  Metodo Api: ' + req.url + ' - Ip Request: ' + req.ip + ' - Metodo HTTP: ' + req.method + ' - Body Request: ' + JSON.stringify(req.body));
    let respuesta = res.send;
    res.send = function(data) {
        respuesta.apply(res, arguments);
        console.log('Mensaje de salida : ' + data)
    }
    next();
});

app.get('/', function(req, res) {
    res.send('Api funcionando!');
});

app.use("/catTipoCliente", require("./api/catTipoCliente/catTipoCliente"));
app.use("/clientes", require('./api/cliente/cliente'));
app.use("/cliente_cuenta", require('./api/cliente_cuenta/cliente_cuenta'));

//inicio de servicio
app.listen(process.env.PORT || app.get("puerto"), () => {
    console.log("Inicio de servidor:", process.env.PORT || app.get("puerto"));
});