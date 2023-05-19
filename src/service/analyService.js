import Record from "../models/Record.js";


// 감정분석 결과값 저장
const updateRecord = async (user_tel, negative, positive) => {
    try {
        const record = Record.findOneAndUpdate({ tel: user_tel },
            {
                negative: negative,
                positive: positive
            }
        )
        return record;
        // const newRecord = new Record({ user_tel, date, content, negative, positive })
        // newRecord.save();
        // return newRecord;

    } catch (error) {
        throw error;
    }
};

export default {
    updateRecord,
};