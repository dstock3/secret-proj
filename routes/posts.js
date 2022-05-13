var express = require('express');
var router = express.Router();

// Require controller modules.
var post_controller = require('../controllers/postController');

// GET request for creating a post. 
router.get('/post/create', post_controller.post_create_get);

//POST request for creating post.
router.post('/post/create', post_controller.post_create_post);

// GET request to delete post.
router.get('/post/:id/delete', post_controller.post_delete_get);

// POST request to delete post.
router.post('/post/:id/delete', post_controller.post_delete_post);

// GET request to update post.
router.get('/post/:id/update', post_controller.post_update_get);

// POST request to update post.
router.post('/post/:id/update', post_controller.post_update_post);

// GET request for one post.
router.get('/post/:id', post_controller.post_detail);

// GET request for list of all posts.
router.get('/posts', post_controller.post_list);

module.exports = router;