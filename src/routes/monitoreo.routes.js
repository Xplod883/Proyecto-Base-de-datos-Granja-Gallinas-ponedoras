const express = require("express");

const router = express.Router();

const {
  obtenerTodos,
  crearMonitoreo
} = require("../controllers/monitoreo.controller");

router.get("/", obtenerTodos);

router.post("/", crearMonitoreo);

module.exports = router;
