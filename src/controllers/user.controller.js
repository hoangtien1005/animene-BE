const userModel = require("../models/user.model")
const favoriteModel = require("../models/favorite.model")
const errorModel = require("../models/error.model")
const { ERROR_CODE } = require("../constants")
module.exports = {
  // [GET] /user
  get: async (req, res) => {
    try {
      const { data } = await userModel.get()
      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },
  // [GET] /user/:id
  getProfile: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await userModel.getById(id)

      if (!data) return res.json(errorModel(404, "User not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },
  // [GET] /user/:id/favorites
  getUserFavorite: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await favoriteModel.getFavoriteByUserId(id)

      if (!data) return res.json(errorModel(404, "User not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },
  // [POST] /user/:id/favorites
  createUserFavorite: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await favoriteModel.create({ ...req.body, user_id: id })

      if (!data) return res.json(errorModel(404, "User not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },
  // [DELETE] /user/:id/favorites/:media_id
  destroyUserFavorite: async (req, res) => {
    try {
      const { id, media_id } = req.params

      await favoriteModel.deleteById(id, media_id)

      return res.json({ data: "Deleted successfully" })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
