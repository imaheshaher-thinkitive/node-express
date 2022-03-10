const { inserData, getAllData } = require("../../lib/queryHelper")
const userProfileModel = require("../../models/userModel/userProfileModel")

module.exports.create = async(req,res) => {
    let data = req.body
    data.user = req.user._id
    console.log(req.user)
    console.log(data)
    let userData = await inserData(userProfileModel,data)
    if(userData.status){
        res.status(201)
        return res.json({
            "status":true,
            "message":"User address added successfullly",
            "data":userData.data
        })
    }
    else {
        return res.json({
            "status":false,
            "message":"Something went wrong",
            "data":{}
        })
    }
}

module.exports.deleteAddress = async(req,res) => {
    let id = req.user._id
    console.log(id)
    userProfileModel.deleteMany({user:id},(err,result)=>{
        if(!err){
            return res.send(result)
        }
        else {
            return res.send("Something went wrong")
        }
    })
    
}
module.exports.getAll = async(req,res) => {
    let query = {
        user : req.user._id
    }
    let userAddress  = await getAllData(userProfileModel,query)
    return res.json({
        "data":userAddress
    })
}