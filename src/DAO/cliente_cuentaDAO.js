const db = require("../config/database");

class Cliente_cuentaDAO{
    async obtenerCliente_cuenta(cliente){
        let respuesta = {};
        try {
            let sql = `CALL SP_OBTENER_CLIENTE_CUENTA(?,?)`;
            let resultado = await db.query(sql, [cliente.id_cliente,cliente.id_cuenta]);
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