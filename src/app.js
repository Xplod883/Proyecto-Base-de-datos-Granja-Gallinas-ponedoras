require("dotenv").config();

const express = require("express");
const path = require("path");

const {
  pool,
  verificarConexion
} = require("./config/database");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/verificar", (req, res) => {
  res.status(200).json({
    correcto: true,
    mensaje: "El servidor Node.js funciona correctamente"
  });
});

app.get("/api/base-datos/verificar", async (req, res) => {
  try {
    const [resultado] = await pool.query(`
      SELECT
        DATABASE() AS base_datos,
        VERSION() AS version_mysql,
        CURRENT_USER() AS usuario_mysql,
        NOW() AS fecha_servidor
    `);

    res.status(200).json({
      correcto: true,
      mensaje: "Conexión correcta con MySQL",
      conexion: resultado[0]
    });
  } catch (error) {
    console.error("Error en /api/base-datos/verificar:", error);

    res.status(500).json({
      correcto: false,
      mensaje: "No fue posible conectar con MySQL",
      codigo: error.code || "ERROR_DESCONOCIDO"
    });
  }
});

app.get("/api/base-datos/galpones", async (req, res) => {
  try {
    const [galpones] = await pool.execute(`
      SELECT
        idGalpon,
        nombre_galpon,
        capacidad_maxima,
        sector,
        sub_sector,
        idTipoManejo
      FROM galpon
      ORDER BY idGalpon
      LIMIT 10
    `);

    res.status(200).json({
      correcto: true,
      mensaje: "Galpones obtenidos correctamente",
      total_mostrado: galpones.length,
      datos: galpones
    });
  } catch (error) {
    console.error("Error al consultar galpones:", error);

    res.status(500).json({
      correcto: false,
      mensaje: "No fue posible consultar los galpones",
      codigo: error.code || "ERROR_DESCONOCIDO"
    });
  }
});

app.use("/api", (req, res) => {
  res.status(404).json({
    correcto: false,
    mensaje: "La ruta solicitada no existe"
  });
});

async function iniciarServidor() {
  try {
    const informacion = await verificarConexion();

    if (informacion.base_datos !== process.env.DB_NAME) {
      throw new Error(
        `La conexión usó ${informacion.base_datos}, ` +
        `pero se esperaba ${process.env.DB_NAME}`
      );
    }

    app.listen(PORT, () => {
      console.log("-------------------------------------------");
      console.log("Sistema Granja de Gallinas");
      console.log(`Servidor: http://localhost:${PORT}`);
      console.log(
        `MySQL: http://localhost:${PORT}/api/base-datos/verificar`
      );
      console.log(
        `Galpones: http://localhost:${PORT}/api/base-datos/galpones`
      );
      console.log("-------------------------------------------");
    });
  } catch (error) {
    console.error("-------------------------------------------");
    console.error("El servidor web no se inició.");
    console.error("Primero debe existir una conexión correcta con MySQL.");
    console.error("-------------------------------------------");

    process.exit(1);
  }
}

iniciarServidor();