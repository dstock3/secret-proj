const User = require('../models/user');
const Posts = require('../models/posts');
const Section = require('../models/section');
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
        thisUser: function(callback) {
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

        let thisUser = {
            userDetails: results.thisUser,
            userID: JSON.stringify(results.thisUser._id)
        }

        for (let i = 0; i < results.posts.length; i++) {
            let postDetails = {
                post: results.posts[i],
                postSectionID: JSON.stringify(results.posts[i].section),
                postUserID: JSON.stringify(results.posts[i].author)
            }
            if (postDetails.postUserID === thisUser.userID) {
                postArray.push(postDetails)
            }
        }
        
        res.render('user_detail', { title: results.thisUser.username, error: err, thisUser: thisUser, posts: postArray, sections: sectionArray });
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