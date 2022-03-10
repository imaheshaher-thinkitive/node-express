const router = require("express").Router()
const { route } = require("express/lib/application")
const userController = require("../../controllers/userController/userController")
const loginController = require("../../controllers/userController/loginController")

const { validateData } = require("../../lib/validateData")
const { validateUser, checkOneOf } = require("../../validator/userValidate")
const passport = require("passport")
//get all user
router.get("/all",userController.getAll)

// get user by id
router.get("/get/:id",userController.getUserById)

//create user
router.post("/create",[    
    validateUser.validateEmail,
    validateUser.validatePassword,
    validateUser.validateUsername,
    validateData
],userController.create)

//update user 

router.patch("/update",[
    
    checkOneOf.checkOneOf,validateData
],userController.update)

// delete user 
router.delete("/delete",userController.delete)


// login

router.post("/login",passport.authenticate('local', { failureRedirect: '/login' }), loginController.login)
module.exports = router