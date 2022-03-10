const passport = require("passport");
const { env } = require("../config");
const { decryptPassword } = require("../controllers/userController/loginController");
const userModel = require("../models/userModel/userModel");
const localStrategy = require("passport-local").Strategy
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;



passport.use('local',new localStrategy(
    function(username, password, done) {
      userModel.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!decryptPassword(user,password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));


passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
          console.log(email)
        try {
          const user = await userModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            console.log(error,"EROOOR")
          return done(error);
        }
      }
    )
  );
  




  passport.use('jwt',
    new JWTstrategy(
      {
        secretOrKey: env.JWT_SECRETE,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
          console.log(token,"token")
        try {
         
          return done(null, token.user);
        } catch (error) {
            console.log(error,"error------------")
          done(error);
        }
      }
    )
  );


  passport.serializeUser(function(user, done) {
 
    
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    userModel.findById(id, function (err, user) {
      done(err, user);
    });
  });