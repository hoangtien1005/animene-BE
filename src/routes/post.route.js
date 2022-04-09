const express = require("express")
const router = express.Router()

const postController = require("../controllers/post.controller")

router.get("/", postController.get)

module.exports = router
