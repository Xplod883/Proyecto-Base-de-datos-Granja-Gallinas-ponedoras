const monitoreoRepository = require(
  "../repositories/monitoreo.repository"
);

async function obtenerTodos() {

  return await monitoreoRepository.obtenerTodos();

}

async function crearMonitoreo(datos) {
  return await monitoreoRepository.crearMonitoreo(datos);
}

module.exports = {
  obtenerTodos,
  crearMonitoreo
};