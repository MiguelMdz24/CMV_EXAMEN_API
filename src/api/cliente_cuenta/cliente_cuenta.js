const { Router } = require("express");
const router = Router();
const controller = require("./cliente_cuenta.controller");

router.get('/', controller.obtenerCliente_Cuenta)

module.exports = router;