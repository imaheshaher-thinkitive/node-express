const router = require("express").Router()
const { route } = require("express/lib/application")
const userController = require("../../controllers/userController/userController")
const loginController = require("../../controllers/userController/loginController")

const { validateData } = require("../../lib/validateData")
const { validateUser, checkOneOf } = require("../../validator/userValidate")
const passport = require("passport")
const jwt = require('jsonwebtoken');
const isLoggedIn = require("../../middleware/isLoggedIn")
const connectEnsureLogin = require('connect-ensure-login');// authorization

//get all user
router.get("/all",userController.getAll)

// get user by id
router.get("/get/:id",userController.getUserById)

//create user
router.post("/signup",[    
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
router.post("/auth",passport.authenticate('local',{ failureRedirect: '/login' }),loginController.login)

// auth by local stratergy
router.get("/profile/by/local-stratergy",connectEnsureLogin.ensureLoggedIn(), async(req,res) => {
    if(req.isAuthenticated()){
        return res.send("User authenticated")
    }
    else {
        return res.send("User not athunticated")
    }
})
router.post("/login",[  validateUser.validateEmail,
    validateUser.validatePassword,validateData],loginController.loginWithJWT)


//secure route
router.get("/profile",passport.authenticate('jwt'),userController.profile)
module.exports = router