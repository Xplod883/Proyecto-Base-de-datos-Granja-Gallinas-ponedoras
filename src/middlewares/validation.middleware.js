function validarCampos(req, res, next) {

    for (const campo in req.body) {

        if (
            req.body[campo] === null ||
            req.body[campo] === ""
        ) {

            return res.status(400).json({
                correcto: false,
                mensaje: `El campo ${campo} es obligatorio`
            });

        }

    }

    next();

}

module.exports = validarCampos;