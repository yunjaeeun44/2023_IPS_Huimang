import Record from "../models/Record.js";


// 12시 기준 대화기록 유무 검사
const findRecord = async (tel, date) => {
    try {

        const record = await Record.find({ user_tel: tel, date: date });
        // 대화 기록 있는 경우
        if (record) {
            return record
        }
        // 대화 기록 없는 경우
        else {
            return null;
        }

    } catch (error) {
        throw error;
    }
};

export default {
    findRecord,
};