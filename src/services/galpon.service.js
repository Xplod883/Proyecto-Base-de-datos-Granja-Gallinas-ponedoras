const galponRepository = require("../repositories/galpon.repository");
const ApiError = require("../utils/ApiError");

function normalizarFiltros(query) {
  const pagina = Number(query.page) || 1;
  const limite = Math.min(Number(query.limit) || 25, 100);
  const offset = (pagina - 1) * limite;

  return {
    pagina,
    limite,
    offset,
    buscar:
      typeof query.buscar === "string"
        ? query.buscar.trim()
        : "",
    tipoManejoId:
      query.tipoManejoId !== undefined
        ? Number(query.tipoManejoId)
        : null,
    capacidadMinima:
      query.capacidadMinima !== undefined
        ? Number(query.capacidadMinima)
        : undefined,
    ordenarPor: query.ordenarPor || "id",
    direccion:
      String(query.direccion || "asc").toLowerCase() === "desc"
        ? "desc"
        : "asc"
  };
}

async function listar(query) {
  const filtros = normalizarFiltros(query);

  const [datos, totalRegistros] = await Promise.all([
    galponRepository.listar(filtros),
    galponRepository.contar(filtros)
  ]);

  return {
    datos,
    paginacion: {
      pagina: filtros.pagina,
      limite: filtros.limite,
      totalRegistros,
      totalPaginas:
        totalRegistros === 0
          ? 0
          : Math.ceil(totalRegistros / filtros.limite)
    }
  };
}

async function obtenerPorId(idGalpon) {
  const galpon = await galponRepository.obtenerPorId(idGalpon);

  if (!galpon) {
    throw new ApiError(
      404,
      "No se encontró el galpón solicitado"
    );
  }

  return galpon;
}

async function validarReglas(datos, idExcluir = null) {
  const existeTipoManejo =
    await galponRepository.existeTipoManejo(datos.tipoManejoId);

  if (!existeTipoManejo) {
    throw new ApiError(
      400,
      "El tipo de manejo indicado no existe"
    );
  }

  const nombreDuplicado =
    await galponRepository.existeNombre(
      datos.nombreGalpon,
      idExcluir
    );

  if (nombreDuplicado) {
    throw new ApiError(
      409,
      "Ya existe un galpón con ese nombre"
    );
  }
}

async function crear(datos) {
  await validarReglas(datos);

  const idGalpon = await galponRepository.crear(datos);

  return obtenerPorId(idGalpon);
}

async function actualizar(idGalpon, datos) {
  await obtenerPorId(idGalpon);
  await validarReglas(datos, idGalpon);

  await galponRepository.actualizar(idGalpon, datos);

  return obtenerPorId(idGalpon);
}

async function eliminar(idGalpon) {
  await obtenerPorId(idGalpon);

  await galponRepository.eliminar(idGalpon);

  return {
    idGalpon
  };
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};