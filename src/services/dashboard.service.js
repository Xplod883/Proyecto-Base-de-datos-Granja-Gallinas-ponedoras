const repository = require("../repositories/dashboard.repository");

module.exports = {
  obtenerProduccion: repository.obtenerProduccion,
  obtenerClasificacion: repository.obtenerClasificacion,
  obtenerVentas: repository.obtenerVentas,
  obtenerSanidad: repository.obtenerSanidad,
  obtenerInventario: repository.obtenerInventario,
  obtenerGalpones: repository.obtenerGalpones
};