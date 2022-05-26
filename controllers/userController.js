const User = require('../models/user');
const Posts = require('../models/posts');
const Section = require('../models/section');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const async = require('async');

// Display list of all users.
exports.user_list = function(req, res) {
    User.find()
        .exec(function(err, users) {
            if (err) return next(err);
            res.render('user_list', { title: "Users", users: users })
        })
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    async.parallel({
        user: function(callback) {
            User.findOne({username: req.params.name})
                .exec(callback)
        },
        posts: function(callback) {
            Posts.find()
                .exec(callback)
        },
        sections: function(callback) {
            Section.find()
                .exec(callback)
        }
    }, function(err, results) {
        let postArray = []
        let sectionArray = []

        for (let y = 0; y < results.sections.length; y++) {
            let sectionDetails = {
                section: results.sections[y],
                sectionID: JSON.stringify(results.sections[y]._id)
            }
            sectionArray.push(sectionDetails)
        }

        let user = {
            userDetails: results.user,
            userID: JSON.stringify(results.user._id)
        }

        for (let i = 0; i < results.posts.length; i++) {
            let postDetails = {
                post: results.posts[i],
                postSectionID: JSON.stringify(results.posts[i].section),
                postUserID: JSON.stringify(results.posts[i].author)
            }
            if (postDetails.postUserID === user.userID) {
                postArray.push(postDetails)
            }
        }

        res.render('user_detail', { title: results.user.username, error: err, user: user, posts: postArray, sections: sectionArray });
    });
    
};

exports.user_login_get = function(req, res) {
    res.render("login", { user: req.user });
}

exports.user_login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
});

exports.user_logout_get = (req, res) => {
    req.logout();
    res.redirect("/");
  }

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.render("signup", { user: req.user });
};

// Handle user create on POST.
exports.user_create_post = function(req, res, next) {
    
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) { return next(err);
        } else {
            const user = new User({
                username: req.body.name,
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

// Display user delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete GET');
};

// Handle user delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user delete POST');
};

// Display user update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: user update GET');
};

// Handle user update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user update POST');
};