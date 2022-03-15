const router = require("express").Router()
const profileController = require("../../controllers/userController/userProfileController")
const upload = require("../../middleware/uploadMiddleware")

router.post("/create",profileController.create)

router.delete("/delete",profileController.deleteAddress)

router.get("/get",profileController.getAll)

router.patch("/update/image",upload.single("image"), profileController.updateProfileImage)

module.exports = router