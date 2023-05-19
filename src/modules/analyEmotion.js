import Record from "../models/Record.js";
import { dateFormat } from "./dateFormat.js";
import axios from "axios";

const analyEmotion = async () => {

    // 날짜가 오늘인 record 목록
    const allRecord = await Record.find({ date: dateFormat() })

    console.log(allRecord)

    // record 돌아가면서 감정 분석
    for (let record of allRecord) {

        console.log("record", record);
        console.log("content", record.content);

        const response = await axios.post('http://127.0.0.1:5000/analy', {
            sentence: record.content
        });

        const negative = new Number(response.data.negative_data.substr(3));
        const positive = new Number(response.data.positive_data.substr(3));

        Record.findOneAndUpdate({ tel: record.tel, date: dateFormat() },
            {
                $set: {
                    negative: negative,
                    positive: positive
                }
            },
        ).exec();

        return true
    }
}

export default analyEmotion;