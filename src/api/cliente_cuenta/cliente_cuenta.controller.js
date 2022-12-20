/* Clase controladora de las cuentas del cliente */
const Cliente_cuentaDAO = require('../../DAO/cliente_cuentaDAO');

class Cliente_cuentaController{
    /* Para todos los metodos:
        Recibe el request realizado y la respuesta que dara
        Regresa la respuesta, si es 500: mensaje del error, si es 200: la data que regresa el DAO
    */

    //clase para obtener las cuentas del cliente
    async obtenerCliente_Cuenta(req, res){
        try {
            let body;
            //Validar que recibio un parametro (id_cliente)
            if(Object.keys(req.body).length === 0){
                return res.status(500).json({status: 500, message: "Sin parametro de entrada"})
            }
            else{
                body = req.body
            }
            let data = await Cliente_cuentaDAO.obtenerCliente_cuenta(body);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({status: 500, message: error.message})
        }
    }
}

module.exports = new Cliente_cuentaController();