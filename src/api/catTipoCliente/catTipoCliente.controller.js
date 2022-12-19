const catTipoClienteDAO = require('../../DAO/catTipoClienteDAO');

class CatTipoClienteController{
    async obtenerCatTipoCliente(req, res){
        try {
            let data = await catTipoClienteDAO.obtenerCatTipoCliente(req.body);
            res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({status: 500, message: error.message})
        }
    }
}

module.exports = new CatTipoClienteController();