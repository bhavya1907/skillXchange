const routes = require("express").Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage})
const freesessionController = require("../apis/freesession/freesessionController")
const paidsessionController = require("../apis/paidsession/paidsessionController")
const userController = require("../apis/users/userController")
const skillController = require("../apis/skill/skillController")
const technologyController = require("../apis/technology/technologyController")
const requestsController = require("../apis/requests/requestsController")
const progressController = require("../apis/progress/progressController")
const tokenchecker = require("../middleware/tokenchecker")

routes.post("/user/register", userController.register)
routes.post("/user/login", userController.login)
routes.post("/user/change-password", tokenchecker, userController.changePassword)
routes.get("/user/profile", tokenchecker, userController.profile)
routes.post("/user/update-profile", tokenchecker, userController.updateProfile)

routes.post("/skills", skillController.getall)
routes.post("/skills/single", skillController.getsingle)

routes.post("/technologies", technologyController.getall)
routes.post("/technologies/single", technologyController.getsingle)

routes.post("/free-sessions", freesessionController.getall)
routes.post("/free-sessions/single", freesessionController.getsingle)

routes.post("/paid-sessions", paidsessionController.getall)
routes.post("/paid-sessions/single", paidsessionController.getsingle)

routes.post("/requests/add", tokenchecker, requestsController.add)
routes.post("/requests", tokenchecker, requestsController.getall)
routes.post("/requests/update", tokenchecker, requestsController.update)
routes.post("/requests/delete", tokenchecker, requestsController.deleteone)

routes.post("/progress/add", tokenchecker, progressController.add)
routes.post("/progress", tokenchecker, progressController.getall)
routes.post("/progress/single", tokenchecker, progressController.getsingle)
routes.post("/progress/update", tokenchecker, progressController.update)
routes.post("/progress/delete", tokenchecker, progressController.deleteone)

module.exports = routes
