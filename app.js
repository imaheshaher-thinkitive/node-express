const express = require("express");
const app = express()
const { env } = require("./config");
const dbConnect = require("./db_connect");
const useRoute = require("./routes/userRoute/userRoute")
const profileRoute = require("./routes/userRoute/profileRoute")

const passport = require("passport");
const session = require('express-session');
app.use(express.urlencoded({extended: false}))
require("./lib/passport-jwt")


//database connection
dbConnect()

//json
app.use(express.json())

// routing
app.use("/user",useRoute)
app.use("/profile",passport.authenticate("jwt"), profileRoute)

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    //secret: process.env.SECRET,
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    // store: sessionStore,
    cookie: {
        maxAge: 1000 * 30
    }
}));
app.get("/",async(req,res) =>{
    return res.send("hello")
})

app.use((err, req, res, next) => {
  let responseStatusCode = 500;
  let responseObj = {
    success: false,
    data: [],
    error: err,
    message: 'There was some internal server error',
  };

  // IF THERE WAS SOME ERROR THROWN BY PREVIOUS REQUEST
  if (!_.isNil(err)) {
    // IF THE ERROR IS REALTED TO JWT AUTHENTICATE, SET STATUS CODE TO 401 AND SET A CUSTOM MESSAGE FOR UNAUTHORIZED
    if (err.name === 'JsonWebTokenError') {
      responseStatusCode = 401;
      responseObj.message = 'You cannot get the details. You are not authorized to access this protected resource';
    }
  }

  if (!res.headersSent) {
    res.status(responseStatusCode).json(responseObj);
  }
});
app.listen(env.PORT,()=>console.log(`App listinig on port ${env.PORT}`))