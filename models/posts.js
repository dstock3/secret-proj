var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostsSchema = new Schema(
  {
    author: {type: Schema.Types.ObjectId, ref: 'Users', required: true}, //reference to the associated user
    subject: {type: String, required: true, maxLength: 100},
    content: {type: String, required: true},
    section: {type: Schema.Types.ObjectId, ref: 'Users', required: true},
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