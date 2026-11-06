const estado = document.getElementById("estado");
const botonVerificar = document.getElementById("botonVerificar");

async function verificarServidor() {
  estado.textContent = "Verificando el servidor...";
  estado.className = "estado estado-espera";

  try {
    const respuesta = await fetch("/api/verificar");

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    estado.textContent = datos.mensaje;
    estado.className = "estado estado-correcto";
  } catch (error) {
    console.error("Error al verificar el servidor:", error);

    estado.textContent =
      "No fue posible comunicarse con el servidor.";

    estado.className = "estado estado-error";
  }
}

botonVerificar.addEventListener("click", verificarServidor);

verificarServidor();