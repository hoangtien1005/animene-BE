const favoriteModel = require("../models/favorite.model")
const errorModel = require("../models/error.model")
const { ERROR_CODE } = require("../constants")
const { formatResponseData } = require("../utils")

module.exports = {
  // [GET] /favorites
  get: async (req, res) => {
    try {
      const { page = 1, perPage = 50 } = req.query

      const { data: documents } = await favoriteModel.get(page, perPage)

      const data = formatResponseData(page, perPage, documents)

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
