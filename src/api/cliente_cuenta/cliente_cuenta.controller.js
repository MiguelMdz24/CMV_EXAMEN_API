const Cliente_cuentaDAO = require('../../DAO/cliente_cuentaDAO');

class Cliente_cuentaController{
    async obtenerCliente_Cuenta(req, res){
        try {
            let data = await Cliente_cuentaDAO.obtenerCliente_cuenta(req.body);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({status: 500, message: error.message})
        }
    }
}

module.exports = new Cliente_cuentaController();