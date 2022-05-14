var express = require('express');
var router = express.Router();
var passport = require('passport');

// Require controller modules.
var user_controller = require('../controllers/userController');

// GET request for creating a user. 
router.get('/sign-up', user_controller.user_create_get);

// POST request for creating user.
router.post('/sign-up', user_controller.user_create_post);

// GET request for user login. 
router.get('/log-in', user_controller.user_login_get);

// POST request for user login. 
router.post('/log-in', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), user_controller.user_login_post);

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