const { validationResult,check } = require("express-validator")

module.exports.validateData = async(req,res,next)=>{
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        
      return res.json({
          "status":false,
          "message": errors.array()[0].msg,
          "data":{}
      })    
      
    }
    next()
}