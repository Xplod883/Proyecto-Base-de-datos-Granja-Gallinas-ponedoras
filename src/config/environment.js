require("dotenv").config();

const env = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT,
    JWT_SECRET: process.env.JWT_SECRET
};

module.exports = env;