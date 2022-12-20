/* Clase controladora de los clientes */
const clienteDAO = require('../../DAO/clienteDAO');

class ClienteController{
    /* Para todos los metodos:
        Recibe el request realizado y la respuesta que dara
        Regresa la respuesta, si es 500: mensaje del error, si es 200: la data que regresa el DAO
    */

    //clase para obtener los clientes
    async obtenerCliente(req, res){
        try {
            let data = await clienteDAO.obtenerCliente();
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({status: 500, message: error.message})
        }
    }
    //clase para eliminar el cliente
    async eliminarCliente(req, res){
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await clienteDAO.eliminarCliente(body);
            res.status(200).json(data);
        } catch (error) {

            return res.status(500).json({status: 500, message: error.message})
        }
    }
    //clase para editar el cliente
    async editarCliente(req, res){
        try {
            let data = await clienteDAO.editarCliente(req.body);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ status: 500, message: error.message });
            
        }
    }
}

module.exports = new ClienteController();