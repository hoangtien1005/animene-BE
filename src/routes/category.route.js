const express = require("express")
const router = express.Router()

const categoryController = require("../controllers/category.controller")

router.get("/", categoryController.get)
router.get("/:id", categoryController.getById)
router.post("/", categoryController.create)
router.put("/:id", categoryController.update)
router.delete("/:id", categoryController.destroy)

module.exports = router
