const express = require("express");
const app = express()
const { env } = require("./config");
const dbConnect = require("./db_connect");
const useRoute = require("./routes/userRoute/userRoute")
const passport = require("passport");
const userModel = require("./models/userModel/userModel");
const { decryptPassword } = require("./controllers/userController/loginController");
const LocalStrategy = require("passport-local").Strategy
const session = require('express-session');

app.use(express.urlencoded({extended: false}))

//database connection
dbConnect()

//json
app.use(express.json())

// routing
app.use("/user",useRoute)

passport.use(new LocalStrategy(
    function(username, password, done) {
       console.log(username)
      userModel.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!decryptPassword(user,password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    userModel.findById(id, function (err, user) {
      done(err, user);
    });
  });
app.use(passport.initialize());
app.use(passport.session());


// app.use(session({
//     //secret: process.env.SECRET,
//     secret: 'some secret',
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//         maxAge: 1000 * 30
//     }
// }));
app.get("/",async(req,res) =>{
    return res.send("hello")
})


app.listen(env.PORT,()=>console.log(`App listinig on port ${env.PORT}`))