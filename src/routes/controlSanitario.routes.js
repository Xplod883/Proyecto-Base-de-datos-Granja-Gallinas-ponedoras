const express = require("express");

const router = express.Router();
    
const {
    obtenerControlSanitario,
    obtenerControlSanitarioPorId,
    insertarControlSanitario,
    actualizarControlSanitario,
    eliminarControlSanitario,
    resumirControlSanitario,
    resumirControlSanitarioPorTipo
} = require("../controllers/controlSanitario.controller");



router.get("/", obtenerControlSanitario);

router.post("/", insertarControlSanitario);

router.get("/indicadores/resumen", resumirControlSanitario);

router.get("/indicadores/por-tipo", resumirControlSanitarioPorTipo);

router.get("/:id", obtenerControlSanitarioPorId);

router.put("/:id", actualizarControlSanitario);

router.delete("/:id", eliminarControlSanitario);

module.exports = router;