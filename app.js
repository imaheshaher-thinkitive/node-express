const express = require("express");
const app = express()
const { env } = require("./config");
const dbConnect = require("./db_connect");
const useRoute = require("./routes/userRoute/userRoute")
const profileRoute = require("./routes/userRoute/profileRoute")

const passport = require("passport");
const session = require('express-session');
const cors = require("cors")
app.use(express.urlencoded({extended: false}))
app.use(cors())
require("./lib/passport-jwt")


//database connection
dbConnect()

//json
app.use(express.json())
app.use("/media",express.static("./media"))
// routing
app.use("/api",useRoute)
app.use("/api/profile",passport.authenticate("jwt"), profileRoute)

// app.use(passport.initialize());
// app.use(passport.session());

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