const User = require('../models/user');
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.auth_login_get = async (req, res, next) => {
    try { return res.render('login', { user: req.user }) }
    catch (err) { return next(err) }
}

exports.auth_login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash: true
});

exports.auth_logout_get = (req, res) => {
    req.logout();
    res.redirect("/");
  }

// Display user create form on GET.
exports.auth_create_get = function(req, res) {
    res.render("signup", { user: req.user });
};

// Handle user create on POST.
exports.auth_create_post = function(req, res, next) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) { return next(err);
        } else {
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                bio: req.body.bio,
                isAdmin: false,
                date: today
              }).save(err => {
                if (err) {
                    console.error(err)
                    return next(err);
                }
                res.redirect("/");
              });
        }
    });
};
