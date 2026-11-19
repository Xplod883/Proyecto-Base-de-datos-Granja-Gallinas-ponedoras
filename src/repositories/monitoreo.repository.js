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

async function obtenerResumenTemperatura(){

    const sql = `
    SELECT
        ROUND(AVG(temperatura_c),2) AS promedio,
        MIN(temperatura_c) AS minima,
        MAX(temperatura_c) AS maxima,
        COUNT(*) AS totalRegistros,
        SUM(dentro_de_rango) AS dentroRango,
        COUNT(*) - SUM(dentro_de_rango) AS fueraRango
    FROM monitoreo_temperatura_bodega
    `;

    const [rows] = await pool.execute(sql);

    return rows[0];

}

async function obtenerTemperaturaPorFecha(){

    const sql = `
    SELECT
        DATE(fecha_hora) AS fecha,
        ROUND(AVG(temperatura_c),2) AS temperaturaPromedio,
        MIN(temperatura_c) AS temperaturaMinima,
        MAX(temperatura_c) AS temperaturaMaxima,
        COUNT(*) AS totalLecturas
    FROM monitoreo_temperatura_bodega
    GROUP BY DATE(fecha_hora) ORDER BY fecha
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}

async function obtenerAlertas(){

    const sql = `
    SELECT
        COUNT(*) AS totalAlertas
    FROM monitoreo_temperatura_bodega
    WHERE dentro_de_rango = 0
    `;

    const [rows] = await pool.execute(sql);

    return rows[0];
}


module.exports = {
  obtenerTodos,
  crearMonitoreo,
  obtenerPorId,
  actualizarMonitoreo,
  obtenerTemperaturaPromedio,
  eliminarMonitoreo,
  obtenerResumenTemperatura,
  obtenerAlertas
};