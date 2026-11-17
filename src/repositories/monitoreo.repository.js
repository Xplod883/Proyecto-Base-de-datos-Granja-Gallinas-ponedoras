const { pool } = require("../config/database");

async function obtenerTodos() {

  const [rows] = await pool.query(`
    SELECT *
    FROM monitoreo_temperatura_bodega
    ORDER BY fecha_hora DESC
  `);

  return rows;

}

async function crearMonitoreo(datos) {
  const sql = `
    INSERT INTO monitoreo_temperatura_bodega
    (
      idUsuario,
      fecha_hora,
      temperatura_c,
      dentro_de_rango
    )
    VALUES (?, ?, ?, ?)
  `;

  const valores = [
    datos.idUsuario,
    datos.fecha_hora,
    datos.temperatura_c,
    datos.dentro_de_rango
  ];

  const [resultado] = await pool.execute(sql, valores);

  return resultado;
}


module.exports = {
  obtenerTodos,
  crearMonitoreo
};