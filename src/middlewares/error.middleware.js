function errorHandler(err, req, res, next) {

    console.error(err);

    res.status(err.status || 500).json({
        correcto: false,
        mensaje: err.message || "Error interno del servidor"
    });

}

module.exports = errorHandler;