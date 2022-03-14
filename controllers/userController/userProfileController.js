const { inserData, getAllData, insertOrUpdate, getData } = require("../../lib/queryHelper")
const userProfileModel = require("../../models/userModel/userProfileModel")

module.exports.create = async(req,res) => {
    let data = req.body
    let query={
        user:req.user._id
    }
    let toUpdate = {
        $push:{address:data.address} 
    }
    let userData = await insertOrUpdate(userProfileModel,query,toUpdate)
    if(userData){
        res.status(201)
        return res.json({
            "status":true,
            "message":"User address added successfullly",
            "data":userData
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
    let query = {
        user:req.user._id
    }
    let toUpdateData = {
        $pull: { address: { _id: req.body.addressId} }
    }
    userProfileModel.updateOne(query,toUpdateData,(err,result)=>{
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
    console.log(query)
    let userAddress  = await getData(userProfileModel,query,{},populate="user")
    return res.json({
        "data":userAddress
    })
}