import config from '../config/index.js';
import User from "../models/User.js";
import getToken from "../modules/getToken.js";
import {create4DigitCode, saveAuthCode, sendMessage}  from '../modules/smsAuth.js';

const signup = async (name, tel, nok_tel) =>{
    try{
        //전화번호가 이미 사용한 것인지 확인
        const checkUser = await User.findOne({tel: tel});
        if (checkUser){ 
            return null;
        }else{
            //전화번호 인증
            const user = new User({name, tel, nok_tel});
            user.save();
            return user;
        }
            
    }catch(error){
        throw error;
    }
};

const login = async (name, tel) =>{
    try{
        const checkUser = await User.findOne({tel: tel});
        if (checkUser){ 
            console.log('❤'.checkUser);
            if(checkUser.name == name){ //이름까지 맞는 경우 -> 로그인 성공
                const jwtToken = getToken(name, tel);
                return jwtToken;
            }else{ //전화번호는 맞지만 이름이 틀린 경우 -> 로그인 실패
                return null;
            }
        }else{//이름이 틀린 경우 -> 로그인 실패
            return null;
        }


    }catch(error){
        throw error;
    }
};

const sendSMS = async (tel) =>{
    try{
        const code = create4DigitCode();
        //레디스에 저장
        //await saveAuthCode(tel, code);
        //문자 발송
        const response = await sendMessage(tel, code);
        if (response){ //문자 전송 성공
            return true;
        }else{ //문자 전송 실패
            return false;
        }
    }catch(error){
        throw error;
    }
};

export default {
    signup,
    login,
    sendSMS,
};