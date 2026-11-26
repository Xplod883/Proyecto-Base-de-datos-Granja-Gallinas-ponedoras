const express = require("express");

const galponController = require("../controllers/galpon.controller");

const {
  validarIdParametro,
  validarDatosGalpon,
  validarConsultaGalpones
} = require("../validators/galpon.validator");

const router = express.Router();

router.get(
  "/",
  validarConsultaGalpones,
  galponController.listar
);

router.get(
  "/:id",
  validarIdParametro,
  galponController.obtenerPorId
);

router.post(
  "/",
  validarDatosGalpon,
  galponController.crear
);

router.put(
  "/:id",
  validarIdParametro,
  validarDatosGalpon,
  galponController.actualizar
);

router.delete(
  "/:id",
  validarIdParametro,
  galponController.eliminar
);

module.exports = router;