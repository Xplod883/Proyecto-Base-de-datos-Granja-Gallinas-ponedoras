require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const dashboardRoutes = require("./routes/dashboard.routes");

const {
  pool,
  verificarConexion
} = require("./config/database");

const galponRoutes = require("./routes/galpon.routes");

const {
  manejarRutaNoEncontrada,
  manejarErrores
} = require("./middlewares/error.middleware");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
|
| Permite que el frontend consuma la API desde:
| - file:///
| - localhost
| - otros puertos locales
|
*/

app.use(cors());

/*
|--------------------------------------------------------------------------
| Middlewares generales
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  express.static(
    path.join(__dirname, "..")
  )
);

/*
|--------------------------------------------------------------------------
| Rutas de verificación
|--------------------------------------------------------------------------
*/

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
    console.error(
      "Error en /api/base-datos/verificar:",
      error
    );

    res.status(500).json({
      correcto: false,
      mensaje: "No fue posible conectar con MySQL",
      codigo: error.code || "ERROR_DESCONOCIDO"
    });
  }
});

/*
|--------------------------------------------------------------------------
| Rutas operativas
|--------------------------------------------------------------------------
*/

app.use("/api/galpones", galponRoutes);
app.use("/api/dashboard", dashboardRoutes);

/*
|--------------------------------------------------------------------------
| Ruta principal
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../index.html")
    );
});

app.use(manejarRutaNoEncontrada);

/*
|--------------------------------------------------------------------------
| Manejo centralizado de errores
|--------------------------------------------------------------------------
*/

app.use(manejarErrores);

/*
|--------------------------------------------------------------------------
| Inicio del servidor
|--------------------------------------------------------------------------
*/

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
        `Verificación API: http://localhost:${PORT}/api/verificar`
      );
      console.log(
        `Verificación MySQL: http://localhost:${PORT}/api/base-datos/verificar`
      );
      console.log(
        `API Galpones: http://localhost:${PORT}/api/galpones`
      );
      console.log(
        `API Dashboards: http://localhost:${PORT}/api/dashboard`
      );
      console.log("-------------------------------------------");
    });
  } catch (error) {
    console.error("-------------------------------------------");
    console.error("El servidor web no se inició.");
    console.error(
      "Primero debe existir una conexión correcta con MySQL."
    );
    console.error(
      "Detalle:",
      error.message
    );
    console.error("-------------------------------------------");

    process.exit(1);
  }
}

iniciarServidor();