require("dotenv").config();

const app = require("./app");

const { verificarConexion } = require("./config/database");

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {

  try {

    await verificarConexion();

    app.listen(PORT, () => {

      console.log(`Servidor ejecutándose en puerto ${PORT}`);

    });

  } catch (error) {

    console.error("No fue posible iniciar el servidor");
    process.exit(1);

  }

}

iniciarServidor();