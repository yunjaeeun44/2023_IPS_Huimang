import express from 'express';
import { messageService } from "../service/index.js";
import sc from '../modules/statusCode.js';

/**
 *  @route POST /message/
 *  @desc check send message alarm or not
 *  @access Private
 */
const checkMessageAlarm = async (req, res) => {
    try {
        const data = req.body;
        const checkMessageAlarmForNotUsing = await messageService.checkMessageAlarmForNotUsing(data);
        const checkMessageAlarmForNegative = await messageService.checkMessageAlarmForNegative(data);

        const result = {};
        if(checkMessageAlarmForNotUsing){ //true면 보호자에게 메세지 전송  
            result.checkMessageAlarmForNotUsing = true;
        }else{ //false면 보호자에게 메세지 전송 안함.
            result.checkMessageAlarmForNotUsing = false;
        }

        if(checkMessageAlarmForNegative){ //true면 보호자에게 메세지 전송  
            result.checkMessageAlarmForNegative = true;
        }else{ //false면 보호자에게 메세지 전송 안함.
            result.checkMessageAlarmForNegative = false;
        }

        return res.status(sc.OK).json({
            status: sc.OK,
            success: true,
            message: "메세지 전송 체크 성공",
            data: result,
        });
        
    }catch (error){
        console.log(error);
        res.status(sc.INTERNAL_SERVER_ERROR).json({
        status: sc.INTERNAL_SERVER_ERROR,
        success: false,
        message: '서버 오류',
        });
    }
};

export default {
    checkMessageAlarm,
};