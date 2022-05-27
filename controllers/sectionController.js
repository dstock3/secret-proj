const Section = require('../models/section');
const Posts = require('../models/posts');
const async = require('async');

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

        for (let y = 0; y < results.sections.length; y++) {
            let newPostArray = []
            for (let i = 0; i < results.posts.length; i++) {
                if (JSON.stringify(results.posts[i].section._id) === JSON.stringify(results.sections[y]._id)) {
                    newPostArray.push(results.posts[i])
                } 
            }

            let sectionDetails = {
                section: results.sections[y],
                posts: newPostArray
            }

            sectionArray.push(sectionDetails)
        }

        res.render('sections_list', { title: 'Sections', error: err, sections: sectionArray });
    });
};

// Display detail page for a specific section.
exports.section_detail = function(req, res) {
    async.parallel({
        posts: function(callback) {
            Posts.find()
                .sort([['subject', 'ascending']])
                .exec(callback)
        },
        section: function(callback) {
            Section.findById(req.params.id)
                .exec(callback)
        }
    }, function(err, results) {
        let sectionID = JSON.stringify(results.section._id)

        let postArray = []
        for (let i = 0; i < results.posts.length; i++) {
            let postSectionID = JSON.stringify(results.posts[i].section)

            if (postSectionID === sectionID) {
                postArray.push(results.posts[i])
            }
        }
        
        res.render('section_detail', { title: results.section.name, error: err, posts: postArray, section: results.section})
        
    });
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