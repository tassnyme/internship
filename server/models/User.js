const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4, unique: true } ,// Add a UUID field

  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  githubUrl:{ type : String , required : true }
});

module.exports = mongoose.model('User', userSchema);
