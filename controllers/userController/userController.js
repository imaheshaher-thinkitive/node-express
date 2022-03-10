const { inserData, getAllData, getData, deleteData } = require("../../lib/queryHelper")
const userModel = require("../../models/userModel/userModel")
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
function encryptPassword(password) {
    return bcrypt.hashSync(password,10);
}


// create user 
module.exports.create = async(req,res) => {
    
    let data = req.body
    

    data.password = encryptPassword(data.password)
    // let userData = await inserData(userModel,data)
    let userData = new userModel(data)
    userData.save((err,result) => {
        if (!err){
            return res.json({
            "status":true,
            "message":"User created successfully",
            "data":result

            })
        }
        else {
            return res.json({
                "status":false,
                "messgae":err.message,
                "data":{}
            })
        }
    })
  
}

//get all user 

module.exports.getAll = async(req,res) => {
    let userData= await getAllData(userModel)
    return res.json({
        "status":true,
        "message":"All user listed successfully",
        "data":userData
    })
}


//get user by id

module.exports.getUserById = async(req,res) => {
    const query = {
        _id:req.params.id
    }
    let userData = await getData(userModel,query)
    if(userData){
        return res.json({
            "status":true,
            "message":"User detailed successfully",
            "data":userData
        })
    }
    else {
        return res.json({
            "status":false,
            "message":"User not found",
            "data":{}
        })
    }
}


//update user 

module.exports.update = async(req,res) => {
    let data = req.body 
    let query = {
        _id:data.id
    }
    userModel.findOneAndUpdate(query,data,{new:true},(err,result) => {
        if(!err){
            return res.json({
                "status":true,
                "message":"User updated successfully",
                "data":result
            })
        }
        else {
            return res.json({
                "status":false,
                "message":err,
                "data":{}
            })
        }
    })
    
}


module.exports.delete = async(req,res) => {
    let query = {
        _id:req.body.id
    }
    let deletedData = await deleteData(userModel,query)
    if(deletedData){
        return res.json({
            "status":true,
            "message":"User deleted successfully",
            "data":{}
        })
    }
    else {
        return res.json({
            "status":false,
            "message":"User not found",
            "data":{}
        })
    }
}

module.exports.profile = async(req,res) => {
    
    return res.json({
        user:req.user
    })
}