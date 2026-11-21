const { pool } = require("../config/database");

async function obtenerControlSanitario(){

    const sql = `
    SELECT
        idEventoSanitario,
        idLote,
        idUsuario,
        cantidad_afectada,
        fecha,
        idTipoEvento,
        producto,
        cepa,
        via_aplicacion,
        observaciones,
        cantidad_dosis,
        idUnidadDosis,
        idBaseAplicacion
    FROM evento_sanitario ORDER BY idEventoSanitario DESC
    `;

    const [rows] = await pool.execute(sql);

    return rows;
}

async function obtenerControlSanitarioPorId(id){

        const sql = `
    SELECT
        idEventoSanitario,
        idLote,
        idUsuario,
        cantidad_afectada,
        fecha,
        idTipoEvento,
        producto,
        cepa,
        via_aplicacion,
        observaciones,
        cantidad_dosis,
        idUnidadDosis,
        idBaseAplicacion
    FROM evento_sanitario 
    WHERE idEventoSanitario = ?
    `;

    const [rows] = await pool.execute(sql,[id]);

    return rows[0];
}

async function insertarControlSanitario(datos) {

    const sql = `
    INSERT INTO evento_sanitario(
        idLote,
        idUsuario,
        cantidad_afectada,
        fecha,
        idTipoEvento,
        producto,
        cepa,
        via_aplicacion,
        observaciones,
        cantidad_dosis,
        idUnidadDosis,
        idBaseAplicacion
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            datos.idLote,
            datos.idUsuario,
            datos.cantidad_afectada,
            datos.fecha,
            datos.idTipoEvento,
            datos.producto,
            datos.cepa,
            datos.via_aplicacion,
            datos.observaciones,
            datos.cantidad_dosis,
            datos.idUnidadDosis,
            datos.idBaseAplicacion
        ];

        const [resultado] = await pool.execute(sql,valores);

        return resultado;
}

async function actualizarControlSanitario(id, datos){

    const sql = `
        UPDATE evento_sanitario
        SET
            idLote = ?,
            idUsuario = ?,
            cantidad_afectada = ?,
            fecha = ?,
            idTipoEvento = ?,
            producto = ?,
            cepa = ?,
            via_aplicacion = ?,
            observaciones = ?,
            cantidad_dosis = ?,
            idUnidadDosis = ?,
            idBaseAplicacion = ?
            `;

            const valores = [
                datos.idLote,
                datos.idUsuario,
                datos.cantidad_afectada,
                datos.fecha,
                datos.idTipoEvento,
                datos.producto,
                datos.cepa,
                datos.via_aplicacion,
                datos.observaciones,
                datos.cantidad_dosis,
                datos.idUnidadDosis,
                datos.idBaseAplicacion,
                id
            ];

            const [resultado] = await pool.execute(sql,valores);

            return resultado.affectedRows;
}

async function eliminarControlSanitario(id){

    const sql = `
    DELETE
    FROM evento_sanitario
    WHERE idEventoSanitario = ?
    `;

    const [resultado] = await pool.execute(sql, [id]);

    return resultado.affectedRows;
}

async function resumirControlSanitario(){

    const sql = `
    SELECT
        COUNT(*) AS totalEventos,
        SUM(cantidad_afectada) as totalAfectadas
    FROM evento_sanitario
    `;

    const [rows] = await pool.execute(sql);
    
    return rows[0];

}

async function resumirControlSanitarioPorTipo(){

    const sql = `
    SELECT
        idTipoEvento,
        COUNT(*) AS total
    FROM evento_sanitario GROUP BY idTipoEvento;
    `;

    const [rows] = await pool.execute(sql);
    
    return rows[0];

}

module.exports = {
    obtenerControlSanitario,
    obtenerControlSanitarioPorId,
    insertarControlSanitario,
    actualizarControlSanitario,
    eliminarControlSanitario,
    resumirControlSanitario,
    resumirControlSanitarioPorTipo
};