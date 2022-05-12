#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Post = require('./models/posts')
var Section = require('./models/section')
var User = require('./models/user')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var posts = []
var sections = []
var users = []

function postCreate(author, subject, content, section, date, cb) {
  var post = new Post({author: author, subject: subject, content: content, section: section, date: date});
       
  post.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New post: ' + post);
    posts.push(post)
    cb(null, post)
  }  );
}

function sectionCreate(name, description, posts, cb) {
  let sectionDetail = {
    name: name, 
    description: description, 
  }
  if (posts !== false) sectionDetail.posts = posts

  var section = new Section(sectionDetail);
       
  section.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Section: ' + section);
    sections.push(section)
    cb(null, section);
  }   );
}

function userCreate(name, date, bio, profile, posts, cb) {
  let userDetail = {
    name: name,
    date: date, 
    bio: bio,
    profile: profile,
  }

  if (posts != false) userDetail.posts = posts
    
  var user = new User(userDetail);    
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  }  );
}

function createSectionUsers(cb) {
    async.series([
        function(callback) {
          userCreate('spaceman', '2022-02-01', 'Risus at ultrices mi tempus imperdiet nulla. Ultricies mi quis hendrerit dolor magna eget est.', false, false, callback);
        },
        function(callback) {
          userCreate('nova92', '2022-03-04', 'Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere.', false, false, callback);
        },
        function(callback) {
          userCreate('chemistry89', '2022-04-21', 'Habitant morbi tristique senectus et. Tincidunt lobortis feugiat vivamus at augue.', false, false, callback);
        },
        function(callback) {
          userCreate('NaCl_1987', '2022-05-05', 'Fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque.', false, false, callback);
        },
        function(callback) {
          sectionCreate("Space", "Tincidunt tortor aliquam nulla facilisi cras. Ut porttitor leo a diam sollicitudin tempor id eu nisl.", false, callback);
        },
        function(callback) {
          sectionCreate("Science Fiction", "Elementum facilisis leo vel fringilla est ullamcorper.", false, callback);
        },
        function(callback) {
          sectionCreate("Biology", "Semper quis lectus nulla at. Non arcu risus quis varius quam quisque id. Volutpat sed cras ornare arcu dui vivamus.", false, callback);
        },
        function(callback) {
          sectionCreate("Physics", "Netus et malesuada fames ac turpis egestas sed tempus urna. Velit laoreet id donec ultrices tincidunt arcu non sodales. Sit amet venenatis urna cursus eget.", false, callback);
        },
        ],
        // optional callback
        cb);
}

function createPosts(cb) {
  //postCreate(author, subject, content, section, date, cb)
    async.parallel([
        function(callback) {
          postCreate(
            users[0],
            "Non arcu risus quis varius quam quisque id. Volutpat sed cras ornare arcu dui vivamus",
            "Mi bibendum neque egestas congue quisque. Cursus eget nunc scelerisque viverra mauris. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus.",
            sections[0],
            '2022-05-02',
            callback);
        },
        function(callback) {
          postCreate(
            users[2],
            "Non arcu risus quis varius quam quisque id. Volutpat sed cras ornare arcu dui vivamus",
            "Ullamcorper eget nulla facilisi etiam dignissim diam. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper.",
            sections[1],
            '2022-05-01',
            callback);
        },
        function(callback) {
          postCreate(
            users[1],
            "Non arcu risus quis varius quam quisque id. Volutpat sed cras ornare arcu dui vivamus",
            "Vulputate sapien nec sagittis aliquam malesuada. Fames ac turpis egestas integer eget aliquet. Nunc sed augue lacus viverra vitae congue eu.",
            sections[3],
            '2022-04-21',
            callback);
        },
        function(callback) {
          postCreate(
            users[0],
            "In vitae turpis massa sed elementum",
            "Nunc sed velit dignissim sodales ut eu sem. Tellus at urna condimentum mattis. Ullamcorper eget nulla facilisi etiam dignissim diam. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper.",
            sections[1],
            '2022-04-22',
            callback);
        },
        ],
        // optional callback
        cb);
}

async.series([
  createSectionUsers,
  createPosts
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    else {
        console.log('Posts: ' + posts);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




