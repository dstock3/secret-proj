const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {type: String, required: true, maxLength: 100},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default:false},
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