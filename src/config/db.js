require("dotenv").config()

const pgp = require("pg-promise")()
const conf = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
}

const db = pgp(conf)
const queryDB = async ({ method, queryString, args }) => {
  try {
    const data = await db[method](queryString, args)
    return { data }
  } catch (err) {
    const { code, message } = err
    
    return { error: { code: code, message: message } }
  }
}
module.exports = { db, pgp, queryDB }
