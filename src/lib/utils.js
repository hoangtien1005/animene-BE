const { SECRET, ERROR_CODE } = require("../constants")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports = {
  /**
   *
   * @param {*} password password got from input
   * @returns hashed password
   */
  genPassword: async (password) => {
    const genHash = await bcrypt.hash(password, 10).then((res) => res)
    return genHash
  },

  /**
   *
   * @param {*} password password got from input
   * @param {*} db_password password stored in db
   * @returns if 2 passwords are match
   */
  checkPassword: async (password, db_password) => {
    const isValid = await bcrypt
      .compare(password, db_password)
      .then((res) => res)
    return isValid
  },

  /**
   *
   * @param {*} payload { email, id } user's email and id
   * @returns token
   */
  issueJWT: (payload) => {
    const expiresIn = "1d"

    const _payload = { ...payload, iat: Date.now() }

    const signedToken = jwt.sign(_payload, SECRET, { expiresIn })

    return signedToken
  }
}
