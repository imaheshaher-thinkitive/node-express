const bcrypt = require("bcrypt")
const { getData } = require("../../lib/queryHelper")
const userModel = require("../../models/userModel/userModel")

module.exports.decryptPassword = (user,password) =>{
    return bcrypt.compareSync(password,user.password)
}
module.exports.login = async(req,res) => {
    let data = req.body     
    return res.json({
        "status":true,
        "message":"User is logged in successfully",
        "data":{}
    })
}   