const mongoose = require('mongoose');

// 대화 한 번의 기록 저장
const dialogSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
    },
    history: {
        type: Array,
    }
})

const Dialog = mongoose.model('Dialog', dialogSchema)

module.exports = { Dialog }