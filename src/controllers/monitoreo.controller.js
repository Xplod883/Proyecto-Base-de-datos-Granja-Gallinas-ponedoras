const monitoreoService = require(
  "../services/monitoreo.service"
);

async function obtenerTodos(req, res) {

  try {

    const datos =
      await monitoreoService.obtenerTodos();

    res.status(200).json({
      correcto: true,
      mensaje: "Monitoreo obtenido correctamente",
      total: datos.length,
      datos
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "Error al consultar monitoreo"
    });

  }
}

async function crearMonitoreo(req, res) {
  try {
    const datos = req.body;

    await monitoreoService.crearMonitoreo(datos);

    res.status(201).json({
      correcto: true,
      mensaje: "Registro creado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      correcto: false,
      mensaje: error.message
    });
  }
}

module.exports = {
  obtenerTodos,
  crearMonitoreo
};