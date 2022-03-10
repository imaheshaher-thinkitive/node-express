const express = require("express");
const app = express()
const { env } = require("./config");
const dbConnect = require("./db_connect");
const useRoute = require("./routes/userRoute/userRoute")
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

// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.json({ error: err });
//   });
app.listen(env.PORT,()=>console.log(`App listinig on port ${env.PORT}`))