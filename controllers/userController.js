var User = require('../models/user');

// Display list of all users.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: user list');
};

// Display detail page for a specific user.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: user detail: ' + req.params.id);
};

exports.user_login_get = function(req, res) {
    res.render("login")
}

exports.user_login_post = function(req, res) {
    res.send('NOT IMPLEMENTED: user login');
}

// Display user create form on GET.
exports.user_create_get = function(req, res) {
    res.render("signup")
};

// Handle user create on POST.
exports.user_create_post = function(req, res, next) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    const user = new User({
        name: req.body.name,
        password: req.body.password,
        bio: req.body.bio,
        date: today
      }).save(err => {
        if (err) { 
          return next(err);
        }
        res.redirect("/");
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