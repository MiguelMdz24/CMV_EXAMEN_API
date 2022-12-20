/* Administrador de las peticiones (post/get/etc) */
const { Router } = require("express");
const router = Router();
const controller = require("./cliente_cuenta.controller");

router.post('/', controller.obtenerCliente_Cuenta)

module.exports = router;