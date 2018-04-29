var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs'); //   encrypt password

var userSchema = new mongoose.Schema({
    
    'username' : {type: String, required: true},
    'email': { type: String, required: true },
    'password': { type:Number, required: true }

    });

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);