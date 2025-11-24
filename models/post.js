const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  
  author: { 
    type: Schema.Types.ObjectId,
     ref: 'User',
      required: true 
    },

 caption: {
     type: String,
      default: '' 
    },

  image: { 
    type: String, 
    default: '' 
  },

  likes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
    }],

  comments: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Comment' 
    }]

}, 

{ timestamps: true });


module.exports = mongoose.model('Post', PostSchema);