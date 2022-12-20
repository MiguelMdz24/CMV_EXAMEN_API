var mysql = require('mysql');
const { promisify } = require("util");
const winston = require("./winston");
const configGlobal = require("./config");

const config = {
    host: configGlobal.HOST_BD,
    user: configGlobal.USER_BD,
    password: configGlobal.PASSWORD_BD,
    database: configGlobal.DATABASE,
    port: configGlobal.PORT_BD,
    multipleStatements: true,
    typeCast: function castField(field, useDefaultTypeCasting) {
        if ((field.type === "BIT") && (field.length === 1)) {
            var bytes = field.buffer();
            return (bytes[0] === 1);
        }
        return (useDefaultTypeCasting());
    }
};

/* Validacion del estado de la conexion con la Base de Datos */
const mysqlPool = mysql.createPool(config);
mysqlPool.query = promisify(mysqlPool.query);

mysqlPool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            winston.error("Se ha perdido la conexión con la base de datos");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            winston.error("Se ha llegado al limite de conexiones con la base de datos");
        }
        if (err.code === "ECONNREFUSED") {
            winston.error("Se ha rechazado la conexión con la base de datos");
        }
    }
    if (connection) {
        connection.release();
        winston.info("Se ha logrado la conexión con la base de datos");
    }
});
module.exports = mysqlPool;