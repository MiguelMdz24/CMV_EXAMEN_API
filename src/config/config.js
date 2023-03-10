/* Configuracion para la conexion de la BD extrayendo los datos de un arhivo .env */
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve('./', process.env.NODE_ENV + '.env')
});
console.log( process.env.NODE_ENV)

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3008,
  /*BD*/
  HOST_BD: process.env.HOST_BD,
  USER_BD: process.env.USER_BD,
  PASSWORD_BD: process.env.PASSWORD_BD,
  DATABASE: process.env.DATABASE,
  PORT_BD: process.env.PORT_BD,
}

console.log("variables de entorno ::::",module.exports);