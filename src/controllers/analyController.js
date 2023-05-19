import axios from 'axios';
import { analyService } from '../service/index.js';
import sc from '../modules/statusCode.js';
import dateFormat from '../modules/dateformat.js';

const postSentence = async (req, res, next) => {
    try {
        const { user, sentence } = req.body;
        const response = await axios.post('http://127.0.0.1:5000/analy', {
            sentence: sentence
        });

        const negative = new Number(response.data.negative_data.substr(3));
        const positive = new Number(response.data.positive_data.substr(3));


        const saveRecord = await analyService.saveRecord(user.tel, dateFormat(), response.data.sentence, negative, positive);
        console.log(saveRecord)
        if (saveRecord) {
            return res.status(sc.CREATED).json({
                status: sc.CREATED,
                success: true,
                data: {
                    user_tel: user.tel,
                    date: dateFormat(),
                    content: response.data.sentence,
                    negative: negative,
                    positive: positive,
                },
                message: "데이터 저장 성공"
            });
        }
        else {
            return res.status(sc.BAD_REQUEST).json({
                status: sc.BAD_REQUEST,
                success: false,
                message: "데이터 입력 오류"
            });
        }
    } catch (error) {
        return res.status(sc.INTERNAL_SERVER_ERROR).json({
            status: sc.INTERNAL_SERVER_ERROR,
            success: false,
            message: "서버 오류"
        })
    }
}

export default {
    postSentence,
}