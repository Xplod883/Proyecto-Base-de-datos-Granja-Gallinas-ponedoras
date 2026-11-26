const ApiError = require("../utils/ApiError");

function manejarRutaNoEncontrada(req, res, next) {
  next(
    new ApiError(
      404,
      `No se encontró la ruta ${req.method} ${req.originalUrl}`
    )
  );
}

function manejarErrores(error, req, res, next) {
  console.error("Error en la API:", error);

  if (error instanceof ApiError) {
    return res.status(error.codigoEstado).json({
      correcto: false,
      mensaje: error.message,
      ...(error.errores && { errores: error.errores })
    });
  }

  if (error.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({
      correcto: false,
      mensaje:
        "Uno de los identificadores relacionados no existe en la base de datos"
    });
  }

  if (error.code === "ER_ROW_IS_REFERENCED_2") {
    return res.status(409).json({
      correcto: false,
      mensaje:
        "No se puede eliminar el registro porque tiene información relacionada"
    });
  }

  if (error.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      correcto: false,
      mensaje: "Ya existe un registro con los datos proporcionados"
    });
  }

  if (error.code === "ER_DATA_TOO_LONG") {
    return res.status(400).json({
      correcto: false,
      mensaje: "Uno de los valores supera la longitud permitida"
    });
  }

  if (error.code === "ER_TRUNCATED_WRONG_VALUE") {
    return res.status(400).json({
      correcto: false,
      mensaje: "Uno de los valores tiene un formato incorrecto"
    });
  }

  return res.status(500).json({
    correcto: false,
    mensaje: "Ocurrió un error interno en el servidor"
  });
}

module.exports = {
  manejarRutaNoEncontrada,
  manejarErrores
};