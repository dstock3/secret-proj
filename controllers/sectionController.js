var Section = require('../models/section');
var Posts = require('../models/posts');
var async = require('async');

// Display list of all sections.
exports.section_list = function(req, res) {
    async.parallel({
        posts: function(callback) {
            Posts.find()
                .sort([['subject', 'ascending']])
                .exec(callback)
        },
        sections: function(callback) {
            Section.find()
                .exec(callback)
        }
    }, function(err, results) {

        let sectionArray = []
        let postArray = []

        for (let y = 0; y < results.sections.length; y++) {
            let sectionDetails = {
                section: results.sections[y],
                sectionID: JSON.stringify(results.sections[y]._id)
            }
            sectionArray.push(sectionDetails)
        }
        for (let i = 0; i < results.posts.length; i++) {
            let postDetails = {
                post: results.posts[i],
                postSectionID: JSON.stringify(results.posts[i].section)
            }
            postArray.push(postDetails)
        }

        res.render('sections', { title: 'Sections', error: err, posts: postArray, sections: sectionArray  });
    });
};

// Display detail page for a specific section.
exports.section_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: section detail: ' + req.params.id);
};

// Display section create form on GET.
exports.section_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: section create GET');
};

// Handle section create on POST.
exports.section_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: section create POST');
};

// Display section delete form on GET.
exports.section_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: section delete GET');
};

// Handle section delete on POST.
exports.section_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: section delete POST');
};

// Display section update form on GET.
exports.section_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: section update GET');
};

// Handle section update on POST.
exports.section_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: section update POST');
};