const categoryModel = require("../models/category.model")
const errorModel = require("../models/error.model")
const { ERROR_CODE } = require("../constants")
const { formatResponseData } = require("../utils")
module.exports = {
  // [GET] /category
  get: async (req, res) => {
    try {
      const { page = 1, perPage = 50 } = req.query

      const { data: documents } = await categoryModel.get(page, perPage)

      const data = formatResponseData(page, perPage, documents)

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [GET] /category/:id
  getById: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await categoryModel.getById(id)

      if (!data) return res.json(errorModel(404, "Category not found."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [POST] /category
  create: async (req, res) => {
    try {
      const { data } = await categoryModel.create(req.body)

      if (!data) return res.json(errorModel(400, "Category already exists."))

      return res.json({ data })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [PUT] /category/:id
  update: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await categoryModel.getById(id)

      if (!data) return res.json(errorModel(404, "Category not found."))

      const { data: newCategory } = await categoryModel.update({
        ...data,
        ...req.body
      })

      return res.json({ data: newCategory })
    } catch (err) {
      return res.json(errorModel())
    }
  },

  // [DELETE] /category/:id
  destroy: async (req, res) => {
    try {
      const { id } = req.params

      const { data } = await categoryModel.getById(id)

      if (!data) return res.json(errorModel(404, "Category not found."))

      await categoryModel.deleteById(id)

      return res.json({ data: "Deleted successfully" })
    } catch (err) {
      return res.json(errorModel())
    }
  }
}
