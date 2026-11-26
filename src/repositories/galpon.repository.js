const { pool } = require("../config/database");

const columnasOrdenamiento = {
  id: "g.idGalpon",
  nombre: "g.nombre_galpon",
  capacidad: "g.capacidad_maxima",
  sector: "g.sector",
  tipoManejo: "g.idTipoManejo"
};

function construirFiltros(filtros) {
  const condiciones = [];
  const parametros = [];

  if (filtros.buscar) {
    condiciones.push(`
      (
        g.nombre_galpon LIKE ?
        OR g.sector LIKE ?
        OR COALESCE(g.sub_sector, '') LIKE ?
      )
    `);

    const termino = `%${filtros.buscar}%`;
    parametros.push(termino, termino, termino);
  }

  if (filtros.tipoManejoId) {
    condiciones.push("g.idTipoManejo = ?");
    parametros.push(filtros.tipoManejoId);
  }

  if (filtros.capacidadMinima !== undefined) {
    condiciones.push("g.capacidad_maxima >= ?");
    parametros.push(filtros.capacidadMinima);
  }

  const where =
    condiciones.length > 0
      ? `WHERE ${condiciones.join(" AND ")}`
      : "";

  return {
    where,
    parametros
  };
}

async function listar(filtros) {
  const { where, parametros } = construirFiltros(filtros);

  const columnaOrdenamiento =
    columnasOrdenamiento[filtros.ordenarPor] ||
    columnasOrdenamiento.id;

  const direccion =
    filtros.direccion === "desc"
      ? "DESC"
      : "ASC";

  const sql = `
    SELECT
      g.idGalpon,
      g.nombre_galpon AS nombreGalpon,
      g.capacidad_maxima AS capacidadMaxima,
      g.sector,
      g.sub_sector AS subSector,
      g.idTipoManejo AS tipoManejoId
    FROM galpon AS g
    ${where}
    ORDER BY ${columnaOrdenamiento} ${direccion}
    LIMIT ? OFFSET ?
  `;

  const parametrosConsulta = [
    ...parametros,
    filtros.limite,
    filtros.offset
  ];

  const [filas] = await pool.query(sql, parametrosConsulta);

  return filas;
}

async function contar(filtros) {
  const { where, parametros } = construirFiltros(filtros);

  const sql = `
    SELECT COUNT(*) AS total
    FROM galpon AS g
    ${where}
  `;

  const [filas] = await pool.query(sql, parametros);

  return Number(filas[0].total);
}

async function obtenerPorId(idGalpon) {
  const sql = `
    SELECT
      g.idGalpon,
      g.nombre_galpon AS nombreGalpon,
      g.capacidad_maxima AS capacidadMaxima,
      g.sector,
      g.sub_sector AS subSector,
      g.idTipoManejo AS tipoManejoId
    FROM galpon AS g
    WHERE g.idGalpon = ?
    LIMIT 1
  `;

  const [filas] = await pool.query(sql, [idGalpon]);

  return filas[0] || null;
}

async function existeTipoManejo(idTipoManejo) {
  const sql = `
    SELECT idTipoManejo
    FROM catalogo_tipo_manejo
    WHERE idTipoManejo = ?
    LIMIT 1
  `;

  const [filas] = await pool.query(sql, [idTipoManejo]);

  return filas.length > 0;
}

async function existeNombre(nombreGalpon, idExcluir = null) {
  let sql = `
    SELECT idGalpon
    FROM galpon
    WHERE nombre_galpon = ?
  `;

  const parametros = [nombreGalpon];

  if (idExcluir !== null) {
    sql += " AND idGalpon <> ?";
    parametros.push(idExcluir);
  }

  sql += " LIMIT 1";

  const [filas] = await pool.query(sql, parametros);

  return filas.length > 0;
}

async function crear(datos) {
  const sql = `
    INSERT INTO galpon (
      nombre_galpon,
      capacidad_maxima,
      sector,
      sub_sector,
      idTipoManejo
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const parametros = [
    datos.nombreGalpon,
    datos.capacidadMaxima,
    datos.sector,
    datos.subSector,
    datos.tipoManejoId
  ];

  const [resultado] = await pool.query(sql, parametros);

  return resultado.insertId;
}

async function actualizar(idGalpon, datos) {
  const sql = `
    UPDATE galpon
    SET
      nombre_galpon = ?,
      capacidad_maxima = ?,
      sector = ?,
      sub_sector = ?,
      idTipoManejo = ?
    WHERE idGalpon = ?
  `;

  const parametros = [
    datos.nombreGalpon,
    datos.capacidadMaxima,
    datos.sector,
    datos.subSector,
    datos.tipoManejoId,
    idGalpon
  ];

  const [resultado] = await pool.query(sql, parametros);

  return resultado.affectedRows;
}

async function eliminar(idGalpon) {
  const sql = `
    DELETE FROM galpon
    WHERE idGalpon = ?
  `;

  const [resultado] = await pool.query(sql, [idGalpon]);

  return resultado.affectedRows;
}

module.exports = {
  listar,
  contar,
  obtenerPorId,
  existeTipoManejo,
  existeNombre,
  crear,
  actualizar,
  eliminar
};