const galponService = require("../services/galpon.service");

async function listar(req, res, next) {
  try {
    const resultado = await galponService.listar(req.query);

    return res.status(200).json({
      correcto: true,
      datos: resultado.datos,
      paginacion: resultado.paginacion
    });
  } catch (error) {
    next(error);
  }
}

async function obtenerPorId(req, res, next) {
  try {
    const galpon = await galponService.obtenerPorId(req.params.id);

    return res.status(200).json({
      correcto: true,
      datos: galpon
    });
  } catch (error) {
    next(error);
  }
}

async function crear(req, res, next) {
  try {
    const galpon = await galponService.crear(req.body);

    return res.status(201).json({
      correcto: true,
      mensaje: "Galpón creado correctamente",
      datos: galpon
    });
  } catch (error) {
    next(error);
  }
}

async function actualizar(req, res, next) {
  try {
    const galpon = await galponService.actualizar(
      req.params.id,
      req.body
    );

    return res.status(200).json({
      correcto: true,
      mensaje: "Galpón actualizado correctamente",
      datos: galpon
    });
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const resultado = await galponService.eliminar(req.params.id);

    return res.status(200).json({
      correcto: true,
      mensaje: "Galpón eliminado correctamente",
      datos: resultado
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};