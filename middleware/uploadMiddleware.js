const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
      cb(null, './media')
    },
    filename: function (req, file, cb) {
        console.log(file)
        let name =  Date.now()+file.originalname.replace(/ /g,"-")
      
      cb(null, name)
    }
})
var upload = multer({ storage: storage })


module.exports = upload