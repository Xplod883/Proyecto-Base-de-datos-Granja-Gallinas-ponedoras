const service = require("../services/dashboard.service");

async function produccion(req, res, next) {
  try {
    res.json(await service.obtenerProduccion());
  } catch (err) {
    next(err);
  }
}

async function clasificacion(req, res, next) {
  try {
    res.json(await service.obtenerClasificacion());
  } catch (err) {
    next(err);
  }
}

async function ventas(req, res, next) {
  try {
    res.json(await service.obtenerVentas());
  } catch (err) {
    next(err);
  }
}

async function sanidad(req, res, next) {
  try {
    res.json(await service.obtenerSanidad());
  } catch (err) {
    next(err);
  }
}

async function inventario(req, res, next) {
  try {
    res.json(await service.obtenerInventario());
  } catch (err) {
    next(err);
  }
}

async function galpones(req, res, next) {
  try {
    res.json(await service.obtenerGalpones());
  } catch (err) {
    next(err);
  }
}

module.exports = {
  produccion,
  clasificacion,
  ventas,
  sanidad,
  inventario,
  galpones
};