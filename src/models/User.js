import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    tel: {
        type: String,
        trim: true, //자동으로 앞 뒤 공백을 없애줌
        unique: 1,
        required: true
    },
    nok_tel: {
        type: String,
        trim: true,
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

export default User;