const db = require("../config/database");

class Cliente_cuentaDAO{
    async obtenerCliente_cuenta(cliente){
        let respuesta = {};
        try {
            let sql = `CALL SP_OBTENER_CLIENTE_CUENTA(?)`;
            let resultado = await db.query(sql, [cliente.id_cliente]);
            respuesta = JSON.parse(JSON.stringify(resultado[0]));
            return respuesta;
        } catch (error) {
            throw error;
        }
    }
}