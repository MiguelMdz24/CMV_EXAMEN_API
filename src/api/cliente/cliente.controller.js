const clienteDAO = require('../../DAO/clienteDAO');

class ClienteController{
    async obtenerCliente(req, res){
        try {
            let data = await clienteDAO.obtenerCliente();
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({status: 500, message: error.message})
        }
    }
    async eliminarCliente(req, res){
        try {
            const body = Object.keys(req.body).length === 0 ? undefined : req.body;
            let data = await clienteDAO.eliminarCliente(body);
            res.status(200).json(data);
        } catch (error) {

            return res.status(500).json({status: 500, message: error.message})
        }
    }
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