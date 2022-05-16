const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostsSchema = new Schema(
  {
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}, //reference the associated user
    subject: {type: String, required: true, maxLength: 100},
    content: {type: String, required: true},
    section: {type: Schema.Types.ObjectId, ref: 'Section', required: true}, //reference to the associated section
    date: {type: Date, required: true, default: Date.now}
  }
);

// Virtual for bookinstance's URL
PostsSchema
.virtual('url')
.get(function () {
  return '/posts/' + this._id;
});

//Export model
module.exports = mongoose.model('Posts', PostsSchema);