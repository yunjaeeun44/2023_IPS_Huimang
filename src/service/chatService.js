import config from '../config/index.js';
import { Configuration, OpenAIApi } from 'openai';

const initChatGPT = async () =>{
    try {
        const configuration = new Configuration({
            apiKey: config.openai_api_key,
        });
        const openai = new OpenAIApi(configuration);
        return openai;
    }catch(error){
        throw error;
    }
}

const openai = await initChatGPT(); //맨 처음 채팅을 시작할 때 실행
const history = []; //추후 사용자 DB에 저장할 내용

const chatGPT = async (data) => {
    try{
        const user_input = data.input;

        //message는 대화의 흐름을 이어가기 위해 이전 내용들을 함께 전송한다.
        const messages = [{role: "system", content: "assistant는 혼자 사는 노인의 친절한 말동무다. assistant의 이름은 '희망'이다. assistant는 사용자의 마음을 편안하게 해야한다."}];
        for (const [input_text, completion_text] of history) {
            messages.push({ role: "user", content: input_text });
            messages.push({ role: "assistant", content: completion_text });
        }
        messages.push({ role: "user", content: user_input });

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 1024, //max: 2048
            temperature: 0.8, //degree of diversity
            messages: messages,
        });
        const completion_text = completion.data.choices[0].message.content;

        //history는 DB에 저장하는 지금까지의 전체 대화 내용.
        history.push([user_input, completion_text]);
        return completion_text;
    }catch(error){
        throw error;
    }
};

export default {
    chatGPT,
};