const favoriteModel = require("../models/favorite.model")
const errorModel = require("../models/error.model")
const { ERROR_CODE } = require("../constants")

module.exports = {
  // [GET] /favorites
  get: async (req, res) => {
    try {
      const { data } = await favoriteModel.get()
      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
