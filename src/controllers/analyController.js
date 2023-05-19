import axios from 'axios';
import { analyService } from '../service/index.js';
import sc from '../modules/statusCode.js';
import { dateFormat } from '../modules/dateFormat.js';

const postSentence = async (req, res, next) => {
    try {
        const { user, sentence } = req.body;
        const response = await axios.post('http://127.0.0.1:5000/analy', {
            sentence: sentence
        });

        const negative = new Number(response.data.negative_data.substr(3));
        const positive = new Number(response.data.positive_data.substr(3));


        const updateRecord = await analyService.updateRecord(user.tel, negative, positive);
        console.log(updateRecord)
        // Recrod 데이터 있어서 변경 성공한 경우
        if (updateRecord) {
            return res.status(sc.OK).json({
                status: sc.OK,
                success: true,
                data: {
                    user_tel: user.tel,
                    date: updateRecord.date,
                    content: sentence,
                    negative: negative,
                    positive: positive,
                },
                message: "데이터 업데이트 성공"
            });
        }
        // Record 데이터 없을 경우
        else {
            return res.status(sc.BAD_REQUEST).json({
                status: sc.BAD_REQUEST,
                success: false,
                message: "데이터 업데이트 오류"
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