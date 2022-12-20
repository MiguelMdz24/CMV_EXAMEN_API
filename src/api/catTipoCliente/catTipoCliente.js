/* Administrador de las peticiones (post/get/etc) */

const { Router } = require("express");
const router = Router();
const controller = require("./catTipoCliente.controller");

router.get('/', controller.obtenerCatTipoCliente);

module.exports = router;