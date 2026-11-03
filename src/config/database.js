const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,

  charset: "utf8mb4",
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

async function verificarConexion() {
  let conexion;

  try {
    conexion = await pool.getConnection();

    const [resultado] = await conexion.query(`
      SELECT
        DATABASE() AS base_datos,
        VERSION() AS version_mysql,
        CURRENT_USER() AS usuario_mysql,
        NOW() AS fecha_servidor
    `);

    console.log("Conexión correcta con MySQL");
    console.log(resultado[0]);

    return resultado[0];
  } catch (error) {
    console.error("No fue posible conectar con MySQL");
    console.error(`Código: ${error.code || "SIN_CODIGO"}`);
    console.error(`Mensaje: ${error.message}`);

    throw error;
  } finally {
    if (conexion) {
      conexion.release();
    }
  }
}

module.exports = {
  pool,
  verificarConexion
};