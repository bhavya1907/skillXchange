const routes = require("express").Router()
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage})
const freesessionController = require("../apis/freesession/freesessionController")
const paidsessionController = require("../apis/paidsession/paidsessionController")
const userController = require("../apis/users/userController")
const skillController = require("../apis/skill/skillController")
const technogolyController = require("../apis/technology/technologyController")
const requestsController = require("../apis/requests/requestsController")

routes.post("user/login", userController.login)




