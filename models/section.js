var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SectionSchema = new Schema(
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
  return '/section/' + this.name;
});

//Export model
module.exports = mongoose.model('Section', SectionSchema);