import Record from "../models/Record.js";


// 감정분석 결과값 저장
const saveRecord = async (date, sentence, negative, positive) => {
    try {
        const newRecord = new Record({ date, sentence, negative, positive, })
        newRecord.save();
        return newRecord;

    } catch (error) {
        throw error;
    }
};

export default {
    saveRecord,
};