const express = require("express")
const router = express.Router()

const favoriteController = require("../controllers/favorite.controller")

router.get("/", favoriteController.get)

module.exports = router
