class ApiError extends Error {
  constructor(codigoEstado, mensaje, errores = null) {
    super(mensaje);

    this.name = "ApiError";
    this.codigoEstado = codigoEstado;
    this.errores = errores;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;