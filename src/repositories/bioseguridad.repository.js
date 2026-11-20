const { pool } = require("../config/database");

async function ObtenerIngresos(){

    const [rows] = await pool.query(`
        SELECT
            idIngreso,
            idUsuario,
            nombre_visitante,
            placa_vehiculo,
            motivo_visita,
            desinfeccion_aplicada,
            fecha_hora_ingreso,
            fecha_hora_salida
        FROM registro_ingreso_bioseguridad ORDER BY idIngreso DESC
        `);

    return rows;

}

async function añadirIngreso(datos) {
  const sql = `
    INSERT INTO registro_ingreso_bioseguridad
    (
      idUsuario,
      nombre_visitante,
      placa_vehiculo,
      motivo_visita,
      desinfeccion_aplicada,
      fecha_hora_ingreso,
      fecha_hora_salida
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    datos.idUsuario,
    datos.nombre_visitante,
    datos.placa_vehiculo,
    datos.motivo_visita,
    datos.desinfeccion_aplicada,
    datos.fecha_hora_ingreso,
    datos.fecha_hora_salida
  ];

  const [resultado] = await pool.execute(sql, valores);

  return resultado;
}

async function obtenerPorIdBio(id){

    const sql = `
        SELECT
            idIngreso,
            idUsuario,
            nombre_visitante,
            placa_vehiculo,
            motivo_visita,
            desinfeccion_aplicada,
            fecha_hora_ingreso,
            fecha_hora_salida
        FROM registro_ingreso_bioseguridad
        WHERE idIngreso = ?
        `;

        const [rows] = await pool.execute(sql, [id]);

        return rows[0];       
}

async function actualizarIngreso(id, datos){

    const sql = `
        UPDATE registro_ingreso_bioseguridad
        SET
            idUsuario = ?,
            nombre_visitante = ?,
            placa_vehiculo = ?,
            motivo_visita = ?,
            desinfeccion_aplicada = ?,
            fecha_hora_ingreso = ?,
            fecha_hora_salida = ?
            `;

            const valores = [
                datos.idUsuario,
                datos.nombre_visitante,
                datos.placa_vehiculo,
                datos.motivo_visita,
                datos.desinfeccion_aplicada,
                datos.fecha_hora_ingreso,
                datos.fecha_hora_salida,
                id
            ];

            const [resultado] = await pool.execute(sql,valores);

            return resultado.affectedRows;
}

async function eliminarIngreso(id){

    const sql = `
    DELETE
    FROM registro_ingreso_bioseguridad
    WHERE idIngreso = ?
    `;

    const [resultado] = await pool.execute(sql, [id]);

    return resultado.affectedRows;
}

async function ingresosMensuales() {

  const sql = `
    SELECT
      YEAR(fecha_hora_ingreso) AS anio,
      MONTH(fecha_hora_ingreso) AS mes,
      COUNT(*) AS totalIngresos
    FROM registro_ingreso_bioseguridad
    GROUP BY
      YEAR(fecha_hora_ingreso),
      MONTH(fecha_hora_ingreso)
    ORDER BY
      anio,
      mes
  `;

  const [rows] = await pool.execute(sql);

  return rows;
}

module.exports = {
    ObtenerIngresos,
    añadirIngreso,
    obtenerPorIdBio,
    actualizarIngreso,
    eliminarIngreso,
    ingresosMensuales
};