const db = require("../config/database");

class ClienteDAO{
    async obtenerCliente(){
        let respuesta = {};
        try {
            let sql = `CALL SP_OBTENER_CLIENTES()`;
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
    async eliminarCliente(cliente){
        let respuesta = {};
        try {
            let sql = `CALL SP_ELIMINAR_CLIENTE(?)`;
            let resultado = await db.query(sql,[cliente.id_cliente]);
            respuesta = JSON.parse(JSON.stringify(resultado));
            if(respuesta.affectedRows >= 1){
                return {status: 200};
            }
            else{
                throw {message: "Error al eliminar cliente"};
            }
        } catch (error) {
            throw error;
        }
    }
    async editarCliente(cliente){
        let respuesta = {};
        try {
            let sql = `CALL SP_EDITAR_CLIENTE(?,?,?,?,?,?)`
            let resultado = await db.query(sql,[cliente.id_cliente,cliente.nombre,cliente.apellido_paterno,cliente.apellido_materno,cliente.rfc,cliente.curp])
            respuesta = JSON.parse(JSON.stringify(resultado));
            if(respuesta.affectedRows == 1){
                return {status: 200};
            }
            else{
                throw {message: "Error al editar cliente"};
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ClienteDAO();