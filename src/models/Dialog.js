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
    // 희망이 말
    content_a: {
        type: String,
    },
    // 사용자 말
    content_u: {
        type: String,
    },
    // 사용자 말의 긍정 수치
    emotion_p: {
        type: Number,
        default: 0,
    },
    // 사용자 말의 부정 수치
    emotion_n: {
        type: Number,
        default: 0,
    }
})

const Dialog = mongoose.model('Dialog', dialogSchema)

module.exports = { Dialog }