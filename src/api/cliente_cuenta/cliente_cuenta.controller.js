const Cliente_cuentaDAO = require('../../DAO/cliente_cuentaDAO');

class Cliente_cuentaController{
    async obtenerCliente_Cuenta(req, res){
        try {
            let body;
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