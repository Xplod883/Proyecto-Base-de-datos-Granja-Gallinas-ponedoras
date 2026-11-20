const bioseguridadService = require(
  "../services/bioseguridad.service"
);

async function ObtenerIngresos(req, res){
    
  try {

    const datos = await bioseguridadService.ObtenerIngresos();

    res.status(200).json({
      correcto: true,
      mensaje: "Ingresos obtenidos correctamente",
      datos
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "Error al consultar ingresos"
    });

  }
}

async function añadirIngreso(req, res) {
  try {
    const datos = req.body;

    await bioseguridadService.añadirIngreso(datos);

    res.status(201).json({
      correcto: true,
      mensaje: "Ingreso creado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      correcto: false,
      mensaje: error.message
    });
  }
}

async function obtenerPorIdBio(req, res){
  try{
    const { id } = req.params;

    const dato = await bioseguridadService.obtenerPorIdBio(id);

    if (!dato) {
      return res.status(404).json({
        correcto: false,
        mensaje: "ingreso no encontrado"
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
      mensaje: "Error al consultar ingreso"
    });
  }
}

async function actualizarIngreso(req, res){
  try{
    const { id } = req.params;
    const datos = req.body;

    const resultado = await bioseguridadService.actualizarIngreso(
      id,
      datos
    );

      res.status(200).json({
        correcto: true,
        mensaje: "ingreso actualizado",
        datos: resultado
      });
    }catch (error){
      console.error(error);

      res.status(500).json({
        correcto: false,
        mensaje: "ingreso no encontrado"
      });

  }
}

async function eliminarIngreso(req, res){
  try{
    const { id } = req.params;

    const resultado = await bioseguridadService.eliminarIngreso(id);

    if (resultado === 0){
      return res.status(404).json({
        correcto: false,
        mensaje: "ingreso no encontrado"
      });
    }
    res.status(200).json({
      correcto: true,
      mensaje: "ingreso eliminado correctamente"
    });
  }catch (error){
    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "No se pudo eliminar el ingreso"
    });
  }
}

async function ingresosMensuales(req, res) {

  try {

    const datos =
      await bioseguridadService.ingresosMensuales();

    res.status(200).json({
      correcto: true,
      mensaje: "Ingresos mensuales obtenidos correctamente",
      total: datos.length,
      datos
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      correcto: false,
      mensaje: "Error al obtener ingresos mensuales"
    });

  }

}

module.exports = {
  ObtenerIngresos,
  añadirIngreso,
  obtenerPorIdBio,
  actualizarIngreso,
  eliminarIngreso,
  ingresosMensuales
};