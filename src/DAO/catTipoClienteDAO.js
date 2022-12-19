const db = require("../config/database");

class catTipoClienteDAO{
    async obtenerCatTipoCliente(){
        let respuesta = {};
        try {
            let sql = `CALL SP_OBTENER_TIPO_CLIENTES()`;
            let resultado = await db.query(sql);
            respuesta = JSON.parse(JSON.stringify(resultado[0]));
            if(respuesta.estatus == 200){
                respuesta.catTipoCliente = JSON.parse(JSON.stringify(respuesta[1]));
            }
            return respuesta;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new catTipoClienteDAO();