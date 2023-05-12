const mongoose = require('mongoose');

// 하루 동안의 사용자 말 내용 및 감정 저장
const recordSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
    },
    // 하루치 사용자 말 내용 배열
    content_u: {
        type: Array,
    },
    // 하루치 사용자 말 내용 기반 긍정 수치
    emotion_p: {
        type: String,
        default: 0,
    },
    // 하루치 사용자 말 내용 기반 부정 수치
    emotion_n: {
        type: Number,
        default: 0,
    },
    // 연락 여부
    is_contact: {
        type: Boolean,
        default: false,
    }
})

const Record = mongoose.model('Record', recordSchema)

module.exports = { Record }