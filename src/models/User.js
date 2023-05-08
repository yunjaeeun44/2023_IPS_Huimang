const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    tel: {
        type: String,
        trim: true,
        unique: 1,
        required: true
    },
    nok_tel: {
        type: String,
        trim: true,
        unique: 1,
        required: true
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }