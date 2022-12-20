/* Clase controladora de los tipos de clientes */
const catTipoClienteDAO = require('../../DAO/catTipoClienteDAO');

class CatTipoClienteController{
    /* Para todos los metodos:
        Recibe el request realizado y la respuesta que dara
        Regresa la respuesta, si es 500: mensaje del error, si es 200: la data que regresa el DAO
    */
   //Metodo para obtener los tipos de clientes
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