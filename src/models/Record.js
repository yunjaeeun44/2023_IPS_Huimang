import mongoose from 'mongoose';

// 하루 동안의 사용자 말 내용 및 감정 저장
const recordSchema = mongoose.Schema({
    tel: {
        type: String,
        required: true,
        trim: true,
        ref: 'User'
    },
    //대화 날짜
    date: {
        type: String,
        required: true,
    },
    // 하루치 사용자 말 내용 배열
    content: {
        type: String,
    },
    // 하루치 사용자 말 내용 기반 부정 수치
    negative: {
        type: Number,
        default: 0,
    },
    // 하루치 사용자 말 내용 기반 긍정 수치
    positive: {
        type: Number,
        default: 0,
    },
})

const Record = mongoose.model('Record', recordSchema)

export default Record;