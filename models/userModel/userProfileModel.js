const mongoose = require("mongoose")

const userProfileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    address:{
        street:{
            type:String
        },
        city:{
            type:String
        },
        pincode:String
    }
},{timestamps:true})


const userProfileModel = mongoose.model("profile",userProfileSchema)

module.exports = userProfileModel