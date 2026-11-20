const express = require("express");

const router = express.Router();

const {
    ObtenerIngresos,
    añadirIngreso,
    obtenerPorIdBio,
    actualizarIngreso,
    eliminarIngreso,
    ingresosMensuales
} = require("../controllers/bioseguridad.controller");

router.get("/obtenerIngresos", ObtenerIngresos);

router.get("/ingresos-mensuales", ingresosMensuales);

router.post("/", añadirIngreso);

router.get("/:id", obtenerPorIdBio);

router.put("/:id", actualizarIngreso);

router.delete("/:id", eliminarIngreso);

module.exports = router;