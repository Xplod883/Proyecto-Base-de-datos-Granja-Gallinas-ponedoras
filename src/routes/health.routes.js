const express = require("express");

const router = express.Router();

const { pool } = require("../config/database");

router.get("/", async (req, res) => {

    try {

        await pool.query("SELECT 1");

        res.json({
            correcto: true,
            mensaje: "API funcionando",
            baseDatos: "conectada"
        });

    } catch (error) {

        res.status(500).json({
            correcto: false,
            mensaje: "Error de conexión",
            baseDatos: "desconectada"
        });

    }

});

module.exports = router;