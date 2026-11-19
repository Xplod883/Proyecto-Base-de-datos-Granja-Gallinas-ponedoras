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

async function obtenerResumenTemperatura(){
    return await monitoreoRepository.obtenerResumenTemperatura();
}

async function obtenerTemperaturaPorFecha(){
    return await monitoreoRepository.obtenerTemperaturaPorFecha();
}

async function obtenerAlertas(){
    return await monitoreoRepository.obtenerAlertas();
}

module.exports = {
  obtenerTodos,
  crearMonitoreo,
  obtenerPorId,
  actualizarMonitoreo,
  obtenerTemperaturaPromedio,
  eliminarMonitoreo,
  obtenerResumenTemperatura,
  obtenerTemperaturaPorFecha,
  obtenerAlertas
};