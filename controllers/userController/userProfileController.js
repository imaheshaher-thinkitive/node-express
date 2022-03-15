const { inserData, getAllData, insertOrUpdate, getData } = require("../../lib/queryHelper")
const userProfileModel = require("../../models/userModel/userProfileModel")
const {getAppPath}  = require("../../lib/getRootPath")
const fs = require("fs")
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
    let userAddress  = await getData(userProfileModel,query,{},populate="user")
    return res.json({
        "data":userAddress
    })
}


module.exports.updateProfileImage = async(req,res) =>{
    let files = req.file
    console.log(req.file)
    if(!files){
        return res.json({
            "status":false,
            "message":"Image is required",
            "data":{}
        })
    }
  
    let query = {
        user:req.user._id
    }
    let updateData = {
        avatar:files.path
    }
    let getUserProfileData = await getData(userProfileModel,query,{avatar:1})
    if(getUserProfileData && getUserProfileData.avatar ){
       
        let path = await getAppPath()
         path = path + "/" + getUserProfileData.avatar
       
        fs.unlink(path,(err,result) =>{
            if(!err){
                console.log("Image deleted ")
            }
            else {
                console.log(err)
            }
        })
        
    }
    const updatedData = await insertOrUpdate(userProfileModel,query,updateData)
    
        // let updatedData = await getData(userProfileModel,query)
        return res.json({
            "status":true,
            "message":"Image Uploaded successfully",
            "data":updateData
        })
    
  
}