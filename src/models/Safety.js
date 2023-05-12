const mongoose = require('mongoose');

// 안부 확인 알림의 사용자 응답 여부 저장
const safetySchema = mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
    },
    // 응답 횟수 0~3
    resNum: {
        type: Number,
        default: 0,
        max: 3,
    },
})

const Safety = mongoose.model('User', safetySchema)

module.exports = { Safety }