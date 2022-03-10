const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        lowercase:true,
        trim:true,
        unique:true,
        required:true
    },
    firstName:{
        type:String,
        lowercase:true
    },
    lastName:{
        type:String,
        lowercase:true
    },
    phone:{
        type:String,
        unique:true,
        required:true,
        validate: {
            validator: function(v) {
              return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          }
    }
},{timestamps:true})


userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }
  
const userModel = mongoose.model("user",userSchema)

module.exports = userModel