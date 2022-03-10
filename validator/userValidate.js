const {check, oneOf} = require("express-validator")

module.exports.validateUser={
  validateEmail:check('email').normalizeEmail().isEmail().withMessage("Enter the valid email"),
  validatePassword:check('password').notEmpty().withMessage("Password is required").isLength({min:6}).withMessage("Password should be greater than 5 character"),
  validateUsername:check("username").trim().notEmpty().withMessage("Username is required"),
  validateId:check("id").trim().notEmpty("User id is required").isObject("Id should be object")
}

module.exports.checkOneOf ={
    checkOneOf:[this.validateUser.validateEmail.optional(),this.validateUser.validateUsername.optional()]
}