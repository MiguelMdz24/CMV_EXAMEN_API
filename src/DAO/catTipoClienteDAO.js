/*Clase para las peticiones de la Base De Datos de los tipos de clientes */
const db = require("../config/database");

class catTipoClienteDAO{
    /* Metodo para obtener los tipos de clientes */
    async obtenerCatTipoCliente(){
        let respuesta = {};
        try {
            let sql = `CALL SP_OBTENER_TIPO_CLIENTES()`;
            let resultado = await db.query(sql);
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

module.exports = new catTipoClienteDAO();