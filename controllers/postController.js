const Posts = require('../models/posts');
const Section = require('../models/section');
const User = require('../models/user')
const async = require('async');

// Display list of all Posts.
exports.post_list = function(req, res) {
    async.parallel({
        posts: function(callback) {
            Posts.find()
                .exec(callback)
        },
        sections: function(callback) {
            Section.find()
                .exec(callback)
        },
        users: function(callback) {
            User.find()
                .exec(callback)
        }
    }, function(err, results) {

        let postArray = []
        let sectionArray = []
        let userArray = []

        for (let i = 0; i < results.posts.length; i++) {
            let postDetails = {
                post: results.posts[i],
                postSectionID: JSON.stringify(results.posts[i].section),
                postUserID: JSON.stringify(results.posts[i].author)
            }
            postArray.push(postDetails)
        }

        for (let y = 0; y < results.sections.length; y++) {
            let sectionDetails = {
                section: results.sections[y],
                sectionID: JSON.stringify(results.sections[y]._id)
            }
            sectionArray.push(sectionDetails)
        }

        for (let z = 0; z < results.users.length; z++) {
            let userDetails = {
                user: results.users[z],
                userID: JSON.stringify(results.users[z]._id)
            }
            userArray.push(userDetails)
        }
        res.render('post_list', { title: 'All Posts', error: err, posts: postArray, sections: sectionArray, users: userArray });
    });
};

// Display detail page for a specific Post.
exports.post_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Post detail: ' + req.params.id);
};

// Display Post create form on GET.
exports.post_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Post create GET');
};

// Handle Post create on POST.
exports.post_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Post create POST');
};

// Display Post delete form on GET.
exports.post_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Post delete GET');
};

// Handle Post delete on POST.
exports.post_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Post delete POST');
};

// Display Post update form on GET.
exports.post_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Post update GET');
};

// Handle Post update on POST.
exports.post_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Post update POST');
};