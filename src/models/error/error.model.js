/**
 * 
 * @param {*} code http error code
 * @param {*} message the message of the error
 * @returns standard error response object
 */

module.exports = (code = 500, message = "Something went wrong") => {
  return { error: { code: code, message: message } }
}
