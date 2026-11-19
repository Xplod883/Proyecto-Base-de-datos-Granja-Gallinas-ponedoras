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

async function obtenerPorId(id){

    const sql = `
        SELECT 
            idMonitoreo,
            idUsuario,
            fecha_hora,
            temperatura_c,
            dentro_de_rango
        FROM monitoreo_temperatura_bodega
        WHERE idMonitoreo = ?
        `;

        const [rows] = await pool.execute(sql, [id]);

        return rows[0];       
}

async function actualizarMonitoreo(id, datos){

    const sql = `
        UPDATE monitoreo_temperatura_bodega
        SET
            idUsuario = ?,
            fecha_hora = ?,
            temperatura_c = ?,
            dentro_de_rango = ?
            `;

            const valores = [
                datos.idUsuario,
                datos.fecha_hora,
                datos.temperatura_c,
                datos.dentro_de_rango,
                id
            ];

            const [resultado] = await pool.execute(sql,valores);

            return resultado.affectedRows;
}

async function obtenerTemperaturaPromedio(){
    const sql = `
    SELECT
        AVG(temperatura_c) AS promedio
    FROM monitoreo_temperatura_bodega
    `;

    const [rows] = await pool.execute(sql);

    return rows[0];
}

async function eliminarMonitoreo(id){

    const sql = `
    DELETE
    FROM monitoreo_temperatura_bodega
    WHERE idMonitoreo = ?
    `;

    const [resultado] = await pool.execute(sql, [id]);

    return resultado.affectedRows;
}


module.exports = {
  obtenerTodos,
  crearMonitoreo,
  obtenerPorId,
  actualizarMonitoreo,
  obtenerTemperaturaPromedio,
  eliminarMonitoreo
};