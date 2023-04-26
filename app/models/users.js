const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
        default: false
    },
    isAdmin:{
        type: Boolean,
        require: true,
        default: false
    }
})

module.exports = mongoose.model('Users', userSchema);
