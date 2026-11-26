const { pool } = require("../config/database");

/*
=========================================
DASHBOARD 1 - PRODUCCIÓN
=========================================
*/
async function obtenerProduccion() {

  const [rows] = await pool.query(`
    SELECT
      fecha_produccion AS fecha,
      nombre_galpon AS galpon,
      codigo_lote AS lote,
      cantidad_huevos_recolectados AS recolectados,
      COALESCE(tasa_postura,0) AS postura,
      cantidad_aves_actual,
      usuario_registro
    FROM vw_rep01_produccion_diaria_lote
    ORDER BY fecha_produccion
  `);

  return rows;
}

/*
=========================================
DASHBOARD 2 - CLASIFICACIÓN
=========================================
*/
async function obtenerClasificacion() {

  const [rows] = await pool.query(`
    SELECT
      codigo_lote AS galpon,
      fecha_produccion AS fecha,

      SUM(
        CASE
          WHEN categoria = 'JUMBO'
          THEN huevos_clasificados
          ELSE 0
        END
      ) AS jumbo,

      SUM(
        CASE
          WHEN categoria = 'EXTRA GRANDE'
          THEN huevos_clasificados
          ELSE 0
        END
      ) AS extra,

      SUM(
        CASE
          WHEN categoria = 'GRANDE'
          THEN huevos_clasificados
          ELSE 0
        END
      ) AS grande,

      SUM(
        CASE
          WHEN categoria = 'MEDIANO'
          THEN huevos_clasificados
          ELSE 0
        END
      ) AS mediano,

      SUM(
        CASE
          WHEN categoria = 'PEQUENO'
          THEN huevos_clasificados
          ELSE 0
        END
      ) AS pequeno

    FROM vw_rep03_clasificacion_huevo

    GROUP BY
      codigo_lote,
      fecha_produccion

    ORDER BY fecha_produccion
  `);

  return rows;
}

/*
=========================================
DASHBOARD 3 - VENTAS
=========================================
*/
async function obtenerVentas() {

  const [rows] = await pool.query(`
    SELECT
      numero_factura AS factura,
      cliente,
      fecha_emision AS fecha,
      total_factura AS total,
      'FACTURADA' AS estado,
      'Guatemala' AS depto
    FROM vw_rep12_facturacion_ventas
    ORDER BY fecha_emision
  `);

  return rows;
}

/*
=========================================
DASHBOARD 4 - SANIDAD
=========================================
*/
async function obtenerSanidad() {

  const [rows] = await pool.query(`
    SELECT
      ROW_NUMBER() OVER() AS id,
      codigo_lote AS lote,
      tipo_evento AS evento,
      producto AS vacuna,
      fecha,
      cantidad_afectada AS aves,
      'COMPLETADO' AS estado
    FROM vw_rep07_eventos_sanitarios
    ORDER BY fecha
  `);

  return rows;
}

/*
=========================================
DASHBOARD 5 - INVENTARIO
=========================================
*/
async function obtenerInventario() {

  const [rows] = await pool.query(`
    SELECT
      idInsumo AS id,
      nombre_insumo AS nombre,
      stock_actual AS stock,
      unidad_medida AS unidad,
      nombre_proveedor AS proveedor
    FROM vw_rep10_existencias_insumos
    ORDER BY nombre_insumo
  `);

  return rows;
}

/*
=========================================
DASHBOARD 6 - GALPONES
=========================================
*/
async function obtenerGalpones() {

  const [rows] = await pool.query(`
    SELECT
      idGalpon AS id,
      nombre_galpon AS nombre,
      sector,
      capacidad_maxima AS capacidad,

      CASE
        WHEN idTipoManejo = 1
          THEN 'TRADICIONAL'

        WHEN idTipoManejo = 2
          THEN 'ORGANICO'

        ELSE 'DESCONOCIDO'
      END AS manejo

    FROM galpon
    ORDER BY nombre_galpon
  `);

  return rows;
}

module.exports = {
  obtenerProduccion,
  obtenerClasificacion,
  obtenerVentas,
  obtenerSanidad,
  obtenerInventario,
  obtenerGalpones
};