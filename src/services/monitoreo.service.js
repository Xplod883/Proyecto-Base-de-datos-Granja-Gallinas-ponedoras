const monitoreoRepository = require(
  "../repositories/monitoreo.repository"
);

async function obtenerTodos() {

  return await monitoreoRepository.obtenerTodos();

}

async function crearMonitoreo(datos) {
  return await monitoreoRepository.crearMonitoreo(datos);
}

async function obtenerPorId(id){
    return await monitoreoRepository.obtenerPorId(id);
}

async function actualizarMonitoreo(id, datos){
    return await monitoreoRepository.actualizarMonitoreo(
        id,
        datos 
    );
}

async function obtenerTemperaturaPromedio(){
    return await monitoreoRepository.obtenerTemperaturaPromedio();
}

async function eliminarMonitoreo(id){
    return await monitoreoRepository.eliminarMonitoreo(id);
}

module.exports = {
  obtenerTodos,
  crearMonitoreo,
  obtenerPorId,
  actualizarMonitoreo,
  obtenerTemperaturaPromedio,
  eliminarMonitoreo
};