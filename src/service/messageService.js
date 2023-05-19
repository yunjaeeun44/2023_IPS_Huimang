import config from '../config/index.js';
import Record from '../models/Record.js';
import User from '../models/User.js';
import sendMessage from '../modules/message.js';
import {dateFormat, yesterdayFormat} from '../modules/dateFormat.js';

const checkMessageAlarmForNotUsing = async (data) => {
    try{
        const user_tel = data.user.tel;
        //오늘 날짜 확인
        const nowDate = dateFormat();
        const yesterDay = yesterdayFormat();
        //오늘 날짜와 어제 날짜 동안 record의 contentrk 비어있으면
        const todayRecord = await Record.findOne({tel: user_tel, date: nowDate});
        const yesterdayRecord = await Record.findOne({tel: user_tel, date: yesterDay});
        
        if(todayRecord && yesterdayRecord){
            if((todayRecord.content=="") && (yesterdayRecord.content=="")){
                //보호자 전화번호, 사용자 이름 확인
                const user = await User.findOne({tel: user_tel});
                const nok_tel = user.nok_tel;
                const name = user.name;
                const content = `안녕하세요. 독거노인의 심리 안정을 위한 애플리케이션 '희망이' 입니다. \n 사용자 ${name}님이 이틀동안 어플을 사용한 적이 없습니다. 사용자의 안부를 확인해주세요.`;
                //📌아래 함수 배포시 활성화 하기
                sendMessage(nok_tel, content);
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }catch(error){
        throw error;
    }
};

const checkMessageAlarmForNegative = async (data) => {
    try{
        const user_tel = data.user.tel;
        //오늘 날짜 확인
        const nowDate = dateFormat();
        const todayRecord = await Record.findOne({tel: user_tel, date: nowDate});
        //오늘동안의 채팅의 부정이 0.9이상이면 메세지 전송
        if (todayRecord.negative >= 0.9){
            const user = await User.findOne({tel: user_tel});
            const nok_tel = user.nok_tel;
            const name = user.name;
            const content = `안녕하세요. 독거노인의 심리 안정을 위한 애플리케이션 '희망이' 입니다. \n 사용자 ${name}님의 하루동안의 대화를 분석한 결과, 부정 수치가 90%이상입니다. 사용자의 안부를 확인해주세요.`;
            //📌아래 함수 배포시 활성화 하기
            sendMessage(nok_tel, content);
            return true;
        }
        return false;
        
    }catch(error){
        throw error;
    }
};

export default {
    checkMessageAlarmForNotUsing,
    checkMessageAlarmForNegative,
};