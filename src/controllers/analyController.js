import axios from 'axios';

const postSentence = async (req, res, next) => {
    try {
        const { sentence } = req.body;
        const response = await axios.post('http://127.0.0.1:5000/analy', {
            sentence: sentence
        });
        res.status(201).json({
            result: 'successPost',
            negative: response.data.negative_data,
            positive: response.data.positive_data,
            prediction: response.data.prediction,
            sentence: response.data.sentence,
        });
    } catch (error) {
        console.log(error);
    }
}

export default {
    postSentence,
}