const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SectionSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, required: true, maxLength: 280},
    posts: {type: Array},
  }
);

// Virtual for section's URL
SectionSchema
.virtual('url')
.get(function () {
  return '/section/' + this._id;
});

//Export model
module.exports = mongoose.model('Section', SectionSchema);