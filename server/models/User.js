const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  uuid: { type: String, default: uuidv4, unique: true } ,
  username: { type: String, required: true , minlength : 3, maxlength:30 },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  githubUrl:{ type : String , required : true  ,unique: true}
},
{
    timestamps : true
});

module.exports = mongoose.model('User', userSchema);
