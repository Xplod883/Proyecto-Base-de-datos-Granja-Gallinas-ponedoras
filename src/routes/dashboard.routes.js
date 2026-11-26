const express = require("express");
const controller = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/produccion", controller.produccion);
router.get("/clasificacion", controller.clasificacion);
router.get("/ventas", controller.ventas);
router.get("/sanidad", controller.sanidad);
router.get("/inventario", controller.inventario);
router.get("/galpones", controller.galpones);

module.exports = router;