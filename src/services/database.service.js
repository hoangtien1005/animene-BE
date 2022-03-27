const { db } = require("../config/db.config")
const { ERROR_CODE } = require("../constants")
module.exports = {
  /**
   *
   * @param {*} method pg-promise methods
   * @param {*} queryString raw query string
   * @param {*} args arguments of the query string
   * @returns success: query result, error: the query result error code
   */
  queryDB: async (method, queryString, args) => {
    try {
      const data = await db[method](queryString, args)
      return { data }
    } catch (err) {
      const isQueryError = Object.values(ERROR_CODE).find(
        (code) => code === err.code
      )

      // error caused by the query result
      if (isQueryError !== undefined) return { error_code: err.code }
      // syntax error, connection error, ...
      else throw new Error(err.message)
    }
  }
}
