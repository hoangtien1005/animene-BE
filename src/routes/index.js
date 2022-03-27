const userRoute = require("./user.route")
const authRoute = require("./auth.route")
const { tokenAuthenticate } = require("../middlewares/auth.middleware")
function route(app) {
  app.use("/auth", authRoute)
  app.use("/", userRoute)
  // app.use("/", tokenAuthenticate, userRoute)
}

module.exports = route
