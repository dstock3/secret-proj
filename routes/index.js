var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');
var post_controller = require('../controllers/postController');
var section_controller = require('../controllers/sectionController');

// GET home page.
router.get('/', function(req, res) {
  console.log(req.user)
  res.render("index", { user: req.user });
});

// Create a Post
router.get('/post/create', post_controller.post_create_get);
router.post('/post/create', post_controller.post_create_post);

// Delete a Post
router.get('/post/:id/delete', post_controller.post_delete_get);
router.post('/post/:id/delete', post_controller.post_delete_post);

// Update a Post
router.get('/post/:id/update', post_controller.post_update_get);
router.post('/post/:id/update', post_controller.post_update_post);

// Display a Post
router.get('/post/:id', post_controller.post_detail);

// Display all Posts
router.get('/posts', post_controller.post_list);

// Create a new Section
router.get('/section/create', section_controller.section_create_get);
router.post('/section/create', section_controller.section_create_post);

// Delete a Section
router.get('/section/:id/delete', section_controller.section_delete_get);
router.post('/section/:id/delete', section_controller.section_delete_post);

// Update a Section
router.get('/section/:id/update', section_controller.section_update_get);
router.post('/section/:id/update', section_controller.section_update_post);

// Display a Section
router.get('/section/:id', section_controller.section_detail);

// Display all Sections
router.get('/sections', section_controller.section_list);

// GET request for creating a user. 
router.get('/sign-up', user_controller.user_create_get);

// POST request for creating user.
router.post('/sign-up', user_controller.user_create_post);

// GET request for user login. 
router.get('/log-in', user_controller.user_login_get);

// POST request for user login. 
router.post('/log-in', user_controller.user_login_post);

// GET request to delete user.
router.get('/user/:name/delete', user_controller.user_delete_get);

// POST request to delete user.
router.post('/user/:name/delete', user_controller.user_delete_post);

// GET request to update user.
router.get('/user/:name/update', user_controller.user_update_get);

// POST request to update user.
router.post('/user/:name/update', user_controller.user_update_post);

// GET request for one user.
router.get('/user/:name', user_controller.user_detail);

// GET request for list of all users.
router.get('/users', user_controller.user_list);

module.exports = router;
