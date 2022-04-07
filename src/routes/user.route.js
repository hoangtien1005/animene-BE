const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.controller")

router.get("/", userController.get)
router.get("/:id", userController.getProfile)
router.get("/:id/favorites", userController.getUserFavorite)
router.post("/:id/favorites", userController.createUserFavorite)
router.delete("/:id/favorites/:media_id", userController.destroyUserFavorite)

module.exports = router
