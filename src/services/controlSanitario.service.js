const controlSanitarioRepository = require(
  "../repositories/controlSanitario.repository"
);

async function obtenerControlSanitario(){

    return await controlSanitarioRepository.obtenerControlSanitario();
}

async function obtenerControlSanitarioPorId(id){

    return await controlSanitarioRepository.obtenerControlSanitarioPorId(id);
}

async function insertarControlSanitario(datos){

    return await controlSanitarioRepository.insertarControlSanitario(datos);
}

async function actualizarControlSanitario(id, datos){
    return await controlSanitarioRepository.actualizarControlSanitario(id ,datos);
}

async function eliminarControlSanitario(id){
    return await controlSanitarioRepository.eliminarControlSanitario(id);
}

async function resumirControlSanitario(){
    return await controlSanitarioRepository.resumirControlSanitario();
}

async function resumirControlSanitarioPorTipo(){
    return await controlSanitarioRepository.resumirControlSanitarioPorTipo();
}

module.exports = {
    obtenerControlSanitario,
    obtenerControlSanitarioPorId,
    insertarControlSanitario,
    actualizarControlSanitario,
    eliminarControlSanitario,
    resumirControlSanitario,
    resumirControlSanitarioPorTipo
}