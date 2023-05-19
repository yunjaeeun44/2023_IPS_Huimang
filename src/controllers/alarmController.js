import sc from '../modules/statusCode.js';
import { alarmService } from '../service/index.js';
import dateFormat from '../modules/dateformat.js';

const getAlarm = async (req, res, next) => {
    try {
        const { user } = req.body;

        // 12시 기준 대화기록 유무 검사
        const findRecord = await alarmService.findRecord(user.tel, dateFormat());
        if (findRecord) {
            return res.status(sc.OK).json({
                status: sc.OK,
                success: true,
                message: '알람 전송 필요',
                data: {
                    send: true
                }
            });
        }
        else {
            return res.status(sc.NOT_FOUND).json({
                status: sc.NOT_FOUND,
                success: true,
                message: '알람 전송 불필요',
                data: {
                    send: false
                }
            })
        }
    } catch (error) {
        res.status(sc.INTERNAL_SERVER_ERROR).json({
            status: sc.INTERNAL_SERVER_ERROR,
            success: false,
            message: '서버 오류',
        })
    }
}

export default {
    getAlarm,
}