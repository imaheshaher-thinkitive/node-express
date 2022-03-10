const router = require("express").Router()
const profileController = require("../../controllers/userController/userProfileController")

router.post("/create",profileController.create)

router.delete("/delete",profileController.deleteAddress)

router.get("/get",profileController.getAll)


module.exports = router