const isLoggedIn = function isLoggedIn(req, res, next) {
    
    // if user is logged in - 
    if (req.isAuthentiated())
        return next();

    // if they aren't redirect them to home
    res.redirect('/');
}

module.exports = isLoggedIn