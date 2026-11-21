const controlSanitarioService = require (
    "../services/controlSanitario.service"
);

async function obtenerControlSanitario(req, res) {

  try {

    const datos =
      await controlSanitarioService.obtenerControlSanitario();

    res.status(200).json({
      correcto: true,
      mensaje: "Eventos sanitarios obtenidos correctamente",
      total: datos.length,
      datos
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "Error al consultar eventos sanitarios"
    });

  }

}

async function obtenerControlSanitarioPorId(req, res){
  try{
    const { id } = req.params;

    const dato = await controlSanitarioService.obtenerControlSanitarioPorId(id);

    if (!dato) {
      return res.status(404).json({
        correcto: false,
        mensaje: "control sanitario no encontrado"
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
      mensaje: "Error al consultar el control sanitario"
    });
  }
}

async function insertarControlSanitario(req, res) {
  try {
    const datos = req.body;

    await controlSanitarioService.insertarControlSanitario(datos);

    res.status(201).json({
      correcto: true,
      mensaje: "control sanitario creado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      correcto: false,
      mensaje: error.message
    });
  }
}

async function actualizarControlSanitario(req, res){
  try{
    const { id } = req.params;
    const datos = req.body;

    const resultado = await controlSanitarioService.actualizarControlSanitario(
      id,
      datos
    );

      res.status(200).json({
        correcto: true,
        mensaje: "control actualizado",
        datos: resultado
      });
    }catch (error){
      console.error(error);

      res.status(500).json({
        correcto: false,
        mensaje: "control no encontrado"
      });

  }
}

async function eliminarControlSanitario(req, res){
  try{
    const { id } = req.params;

    const resultado = await controlSanitarioService.eliminarControlSanitario(id);

    if (resultado === 0){
      return res.status(404).json({
        correcto: false,
        mensaje: "evento no encontrado"
      });
    }
    res.status(200).json({
      correcto: true,
      mensaje: "evento eliminado correctamente"
    });
  }catch (error){
    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "No se pudo eliminar el evento"
    });
  }
}

async function resumirControlSanitario(req, res){
  try{
    const datos = await controlSanitarioService.resumirControlSanitario();

    res.status(200).json({
      correcto: true,
      mensaje: "Resumen obtenido correctamente",
      datos
    });
  }catch (error){
    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "Error al obtener resumen"
    });
  }
}

async function resumirControlSanitarioPorTipo(req, res){
  try{
    const datos = await controlSanitarioService.resumirControlSanitarioPorTipo();

    res.status(200).json({
      correcto: true,
      mensaje: "Resumen obtenido correctamente",
      datos
    });
  }catch (error){
    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "Error al obtener resumen"
    });
  }
}

module.exports = {
    obtenerControlSanitario,
    obtenerControlSanitarioPorId,
    insertarControlSanitario,
    actualizarControlSanitario,
    eliminarControlSanitario,
    resumirControlSanitario,
    resumirControlSanitarioPorTipo
};