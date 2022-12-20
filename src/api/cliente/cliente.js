/* Administrador de las peticiones (post/get/etc) */

const { Router } = require("express");
const router = Router();
const controller = require("./cliente.controller");

router.get('/', controller.obtenerCliente);
router.delete('/', controller.eliminarCliente);
router.put('/', controller.editarCliente);

module.exports = router;