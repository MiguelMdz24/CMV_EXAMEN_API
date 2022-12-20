/*Clase para las peticiones de la Base De Datos de las cuentas de un cliente */

const db = require("../config/database");

class Cliente_cuentaDAO{
    //Metodo para obtener las cuentas de un cliente
    //Recibe un cliente
    async obtenerCliente_cuenta(cliente){
        let respuesta = {};
        try {
            let sql = `CALL SP_OBTENER_CLIENTE_CUENTA(?)`;
            let resultado = await db.query(sql, [cliente.id_cliente]);
            respuesta = JSON.parse(JSON.stringify(resultado[0]));
            if(respuesta.length === 0){
                throw {message: 'Error en la consulta o sin registros'}
            }
            return respuesta;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Cliente_cuentaDAO();