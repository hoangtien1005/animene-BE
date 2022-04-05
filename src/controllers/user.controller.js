const userModel = require("../models/user.model")
const errorModel = require("../models/error.model")
const { ERROR_CODE } = require("../constants")
module.exports = {
  get: async (req, res) => {
    try {
      const { data } = await userModel.get()
      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },
  getProfile: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await userModel.getById(id)

      if (!data) return res.json(errorModel(404, "User not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
