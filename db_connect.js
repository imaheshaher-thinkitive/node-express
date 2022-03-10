const mongoose = require("mongoose")
const { env } = require("./config")


const dbConnect = () => {
    try {
        mongoose.connect(env.DB_URL,{},(err)=>{
            if(!err){
                console.log("Database Connected Succssefully")
            }
            else {
                console.log(err)
            }
        })
    }
    catch(e) {
        console.log(e)
    }
}

module.exports  = dbConnect