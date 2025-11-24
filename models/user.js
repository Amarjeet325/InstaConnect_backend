const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    username: { 
     type: String,
     required: true, 
     unique: true,
      trim: true 
    },
    
    email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  
  password: {
     type: String,
      required: true
     },
     
     bio: {
     type: String,
      default: ''
     }, 
     
     avatar: {
     type: String,
      default: ''
     }, 
     
     followers: [{
     type: Schema.Types.ObjectId, 
     ref: 'User' 
    }],
    
    following: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'User' }]
           },
           
           { timestamps: true });


module.exports = mongoose.model('User', UserSchema);