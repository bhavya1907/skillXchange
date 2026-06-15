const routes = require("express").Router()
const skillController = require("../apis/skill/skillController")
const technologyController = require("../apis/technology/technologyController")
const freesessionController = require("../apis/freesession/freesessionController")
const paidsessionController = require("../apis/paidsession/paidsessionController")
const requestsController = require("../apis/requests/requestsController")
const progressController = require("../apis/progress/progressController")
const admintokenchecker = require("../middleware/admintokenchecker")

routes.use(admintokenchecker)

routes.post("/skills/add", skillController.add)
routes.post("/skills", skillController.getall)
routes.post("/skills/single", skillController.getsingle)
routes.post("/skills/update", skillController.update)
routes.post("/skills/delete", skillController.deleteone)

routes.post("/technologies/add", technologyController.add)
routes.post("/technologies", technologyController.getall)
routes.post("/technologies/single", technologyController.getsingle)
routes.post("/technologies/update", technologyController.update)
routes.post("/technologies/change-status", technologyController.changestatus)
routes.post("/technologies/delete", technologyController.deleteone)

routes.post("/free-sessions/add", freesessionController.add)
routes.post("/free-sessions", freesessionController.getall)
routes.post("/free-sessions/single", freesessionController.getsingle)
routes.post("/free-sessions/update", freesessionController.update)
routes.post("/free-sessions/delete", freesessionController.deleteone)

routes.post("/paid-sessions/add", paidsessionController.add)
routes.post("/paid-sessions", paidsessionController.getall)
routes.post("/paid-sessions/single", paidsessionController.getsingle)
routes.post("/paid-sessions/update", paidsessionController.update)
routes.post("/paid-sessions/delete", paidsessionController.deleteone)

routes.post("/requests", requestsController.getall)
routes.post("/requests/update", requestsController.update)
routes.post("/requests/delete", requestsController.deleteone)

routes.post("/progress/add", progressController.add)
routes.post("/progress", progressController.getall)
routes.post("/progress/single", progressController.getsingle)
routes.post("/progress/update", progressController.update)
routes.post("/progress/delete", progressController.deleteone)

module.exports = routes
