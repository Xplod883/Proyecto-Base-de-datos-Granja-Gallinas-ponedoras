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

async function obtenerPorId(req, res){
  try{
    const { id } = req.params;

    const dato = await monitoreoService.obtenerPorId(id);

    if (!dato) {
      return res.status(404).json({
        correcto: false,
        mensaje: "Registro no encontrado"
      });
    }

    res.status(200).json({
      correcto: true,
      datos: dato
    });
  }catch (error){
    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "Error al consultar registro"
    });
  }
}

async function actualizarMonitoreo(req, res){
  try{
    const { id } = req.params;
    const datos = req.body;

    const resultado = await monitoreoService.actualizarMonitoreo(
      id,
      datos
    );

      res.status(200).json({
        correcto: true,
        mensaje: "Registro actualizado",
        datos: resultado
      });
    }catch (error){
      console.error(error);

      res.status(500).json({
        correcto: false,
        mensaje: "Registro no encontrado"
      });

  }
}

async function obtenerTemperaturaPromedio(
  req,
  res
){
  try{
    const resultado = await monitoreoService.obtenerTemperaturaPromedio();

    res.status(200).json({
      correcto: true,
      datos: resultado
    });

  } catch (error){
    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "Error al calcular promedio"
    });

  }
}

async function eliminarMonitoreo(req, res){
  try{
    const { id } = req.params;

    const resultado = await monitoreoService.eliminarMonitoreo(id);

    if (resultado === 0){
      return res.status(404).json({
        correcto: false,
        mensaje: "registro no encontrado"
      });
    }
    res.status(200).json({
      correcto: true,
      mensaje: "Registro eliminado correctamente"
    });
  }catch (error){
    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "No se pudo eliminar el registro"
    });
  }
}


module.exports = {
  obtenerTodos,
  crearMonitoreo,
  obtenerPorId,
  actualizarMonitoreo,
  obtenerTemperaturaPromedio,
  eliminarMonitoreo
};