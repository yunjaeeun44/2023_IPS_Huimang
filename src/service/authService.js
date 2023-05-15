import config from '../config/index.js';
import User from "../models/User.js";
import getToken from "../modules/getToken.js";

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

export default {
    signup,
    login,
};