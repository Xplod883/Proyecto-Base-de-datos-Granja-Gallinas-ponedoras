const ApiError = require("../utils/ApiError");

function validarIdParametro(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return next(
      new ApiError(400, "El identificador del galpón debe ser un entero positivo")
    );
  }

  req.params.id = id;
  next();
}

function validarDatosGalpon(req, res, next) {
  const {
    nombreGalpon,
    capacidadMaxima,
    sector,
    subSector,
    tipoManejoId
  } = req.body;

  const errores = [];

  if (
    typeof nombreGalpon !== "string" ||
    nombreGalpon.trim().length === 0
  ) {
    errores.push({
      campo: "nombreGalpon",
      mensaje: "El nombre del galpón es obligatorio"
    });
  } else if (nombreGalpon.trim().length > 50) {
    errores.push({
      campo: "nombreGalpon",
      mensaje: "El nombre del galpón no puede superar 50 caracteres"
    });
  }

  const capacidad = Number(capacidadMaxima);

  if (!Number.isInteger(capacidad) || capacidad <= 0) {
    errores.push({
      campo: "capacidadMaxima",
      mensaje: "La capacidad máxima debe ser un entero mayor que cero"
    });
  }

  if (typeof sector !== "string" || sector.trim().length === 0) {
    errores.push({
      campo: "sector",
      mensaje: "El sector es obligatorio"
    });
  } else if (sector.trim().length > 50) {
    errores.push({
      campo: "sector",
      mensaje: "El sector no puede superar 50 caracteres"
    });
  }

  if (
    subSector !== undefined &&
    subSector !== null &&
    typeof subSector !== "string"
  ) {
    errores.push({
      campo: "subSector",
      mensaje: "El subsector debe ser texto o null"
    });
  } else if (
    typeof subSector === "string" &&
    subSector.trim().length > 50
  ) {
    errores.push({
      campo: "subSector",
      mensaje: "El subsector no puede superar 50 caracteres"
    });
  }

  const tipoManejo = Number(tipoManejoId);

  if (!Number.isInteger(tipoManejo) || tipoManejo <= 0) {
    errores.push({
      campo: "tipoManejoId",
      mensaje: "El tipo de manejo debe ser un identificador válido"
    });
  }

  if (errores.length > 0) {
    return next(
      new ApiError(
        400,
        "Los datos enviados no son válidos",
        errores
      )
    );
  }

  req.body = {
    nombreGalpon: nombreGalpon.trim(),
    capacidadMaxima: capacidad,
    sector: sector.trim(),
    subSector:
      typeof subSector === "string" && subSector.trim().length > 0
        ? subSector.trim()
        : null,
    tipoManejoId: tipoManejo
  };

  next();
}

function validarConsultaGalpones(req, res, next) {
  const pagina = Number(req.query.page || 1);
  const limite = Number(req.query.limit || 25);

  if (!Number.isInteger(pagina) || pagina < 1) {
    return next(
      new ApiError(400, "El parámetro page debe ser un entero mayor que cero")
    );
  }

  if (!Number.isInteger(limite) || limite < 1 || limite > 100) {
    return next(
      new ApiError(
        400,
        "El parámetro limit debe ser un entero entre 1 y 100"
      )
    );
  }

  if (
    req.query.tipoManejoId !== undefined &&
    (!Number.isInteger(Number(req.query.tipoManejoId)) ||
      Number(req.query.tipoManejoId) <= 0)
  ) {
    return next(
      new ApiError(
        400,
        "El parámetro tipoManejoId debe ser un entero positivo"
      )
    );
  }

  if (
    req.query.capacidadMinima !== undefined &&
    (!Number.isInteger(Number(req.query.capacidadMinima)) ||
      Number(req.query.capacidadMinima) < 0)
  ) {
    return next(
      new ApiError(
        400,
        "El parámetro capacidadMinima debe ser un entero no negativo"
      )
    );
  }

  const columnasPermitidas = [
    "id",
    "nombre",
    "capacidad",
    "sector",
    "tipoManejo"
  ];

  if (
    req.query.ordenarPor &&
    !columnasPermitidas.includes(req.query.ordenarPor)
  ) {
    return next(
      new ApiError(
        400,
        `ordenarPor debe contener: ${columnasPermitidas.join(", ")}`
      )
    );
  }

  const direccion = String(req.query.direccion || "asc").toLowerCase();

  if (!["asc", "desc"].includes(direccion)) {
    return next(
      new ApiError(400, "La dirección debe ser asc o desc")
    );
  }

  next();
}

module.exports = {
  validarIdParametro,
  validarDatosGalpon,
  validarConsultaGalpones
};