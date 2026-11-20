const bioseguridadRepository = require(
  "../repositories/bioseguridad.repository"
);

async function ObtenerIngresos(){

    return await bioseguridadRepository.ObtenerIngresos();
}

async function añadirIngreso(datos){

    return await bioseguridadRepository.añadirIngreso(datos);

}

async function obtenerPorIdBio(id){
    return await bioseguridadRepository.obtenerPorIdBio(id);
}

async function actualizarIngreso(id, datos){
    return await bioseguridadRepository.actualizarIngreso(id, datos);
}

async function eliminarIngreso(id){
    return await bioseguridadRepository.eliminarIngreso(id);
}

async function ingresosMensuales() {
  return await bioseguridadRepository.ingresosMensuales();
}

module.exports = {
    ObtenerIngresos,
    añadirIngreso,
    obtenerPorIdBio,
    actualizarIngreso,
    eliminarIngreso,
    ingresosMensuales
};