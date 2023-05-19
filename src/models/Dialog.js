import mongoose from 'mongoose';

// chatGPT와의 대화를 위한 대화 기록 저장.
const dialogSchema = mongoose.Schema({
    tel: {
        type: String,
        required: true,
        trim: true,
        ref: 'User'
    },
    history: {
        type: Array,
    }
})

const Dialog = mongoose.model('Dialog', dialogSchema)

export default Dialog;