const express = require("express");

const router = express.Router();

const {
  obtenerTodos,
  crearMonitoreo,
  obtenerPorId,
  actualizarMonitoreo,
  obtenerTemperaturaPromedio,
  eliminarMonitoreo
} = require("../controllers/monitoreo.controller");

router.get("/", obtenerTodos);

router.post("/", crearMonitoreo);

router.get("/:id", obtenerPorId);

router.put("/:id", actualizarMonitoreo);

router.get("/indicadores/promedio", obtenerTemperaturaPromedio);

router.delete("/:id", eliminarMonitoreo);

module.exports = router;
