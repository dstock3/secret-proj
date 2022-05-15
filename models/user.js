var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    date: {type: Date, required: true},
    bio: {type: String, required: true, maxLength: 280},
    profile: {type: String, required: false},
    posts: {type: Array}
  }
);

// Virtual for section's URL
UserSchema
.virtual('url')
.get(function () {
  return '/user/' + this.name;
});

//Export model
module.exports = mongoose.model('User', UserSchema);