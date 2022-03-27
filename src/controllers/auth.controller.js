const userModel = require("../models/user.model")
const errorModel = require("../models/error.model")
const { genPassword, checkPassword, issueJWT } = require("../utils")

module.exports = {
  // [POST] /auth/signup
  signup: async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password)
        return res.json(errorModel(400, "Missing required credentials."))

      const response = await userModel.findByEmail(email)

      console.log(response)

      if (response.data)
        return res.json(errorModel(400, "User already exists."))

      const hashPassword = genPassword(password)

      const { data: user } = await userModel.create({
        email,
        password: hashPassword
      })

      const token = issueJWT({ email: user.email, id: user.user_id })

      return res.json({ data: { user, token } })
    } catch (err) {
      return res.json(errorModel())
    }
  },
  // [POST] /auth/login
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password)
        return res.json(errorModel(400, "Missing required credentials."))

      const { data: user } = await userModel.findByEmail(email)

      if (!user) return res.json(errorModel(400, "User not found."))

      const isValid = checkPassword(password, user.password)

      if (!isValid) return res.json(errorModel(400, "Invalid credentials."))

      const token = issueJWT({ email: user.email, id: user.user_id })

      return res.json({ data: { user, token } })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
