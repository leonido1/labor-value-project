const mongoose = require('mongoose')
const Schema = mongoose.Schema
var bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    name:{
        type:"string",
        required:true,
    },
    password:{
        type:"string",
        required:true,
        
    }
},{
timestamps:true,
})


// hash the password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
  
// checking if password is valid
userSchema.methods.validPassword = function(password,recievedPassword) {
    console.log(password, recievedPassword)
    return bcrypt.compareSync(password, recievedPassword);
};




const User = mongoose.model('user',userSchema)
module.exports = User;

