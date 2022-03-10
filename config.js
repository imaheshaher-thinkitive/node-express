require("dotenv").config()
module.exports.env = {
    PORT:process.env.PORT,
    DB_URL:process.env.DB_URL,
    JWT_SECRETE:process.env.JWT_SECRETE
}