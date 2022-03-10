const bcrypt = require("bcrypt")
const { getData } = require("../../lib/queryHelper")
const userModel = require("../../models/userModel/userModel")
const passport  = require("passport")
const jwt = require('jsonwebtoken');
const { env } = require("../../config");

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


module.exports.loginWithJWT =  async (req, res, next) => {
    passport.authenticate(
      'login',{session:false},
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, env.JWT_SECRETE);

              return res.json({ token:token,user:user });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
