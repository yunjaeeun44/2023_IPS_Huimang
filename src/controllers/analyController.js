import axios from 'axios';
// import analyService from '../service/analyService';
import { analyService } from '../service/index.js';

const postSentence = async (req, res, next) => {
    try {
        const { date, sentence } = req.body;
        const response = await axios.post('http://127.0.0.1:5000/analy', {
            sentence: sentence
        });
        // res.status(201).json({
        //     result: 'successPost',
        //     negative: response.data.negative_data,
        //     positive: response.data.positive_data,
        //     prediction: response.data.prediction,
        //     sentence: response.data.sentence,
        // });

        const saveRecord = await analyService.saveRecord(date, response.data.sentence, response.data.negative_data, response.data.positive_data)
        if (saveRecord) {
            res.status(201).json({
                status: 201,
                success: true,
                negative: response.data.negative_data,
                positive: response.data.positive_data,
                prediction: response.data.prediction,
                sentence: response.data.sentence,
            });
        }
        else {
            console.log('데이터 저장 오류');
        }
    } catch (error) {
        console.log(error);
    }
}

export default {
    postSentence,
}