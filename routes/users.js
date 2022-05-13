var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');

// GET request for creating a user. 
router.get('/sign-up', user_controller.user_create_get);

// POST request for creating user.
router.post('/sign-up', user_controller.user_create_post);

// GET request for user login. 
router.get('/log-in', user_controller.user_login_get);

// POST request for user login. 
router.post('/log-in', user_controller.user_login_post);

// GET request to delete user.
router.get('/user/:id/delete', user_controller.user_delete_get);

// POST request to delete user.
router.post('/user/:id/delete', user_controller.user_delete_post);

// GET request to update user.
router.get('/user/:id/update', user_controller.user_update_get);

// POST request to update user.
router.post('/user/:id/update', user_controller.user_update_post);

// GET request for one user.
router.get('/user/:id', user_controller.user_detail);

// GET request for list of all users.
router.get('/users', user_controller.user_list);

module.exports = router;