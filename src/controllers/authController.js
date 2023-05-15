import config from '../config/index.js';
import { authService } from "../service/index.js";
import sc from '../modules/statusCode.js';
import jwt from 'jsonwebtoken';
/**
 *  @route POST /auth/signup
 *  @desc signup
 *  @access Private
 */
const signup = async (req, res) =>{
    try{
        const { name, tel, nok_tel } = req.body;
        //빈칸이 있다면
        if(!name || !tel || !nok_tel){
            return res.status(sc.BAD_REQUEST).json({
            status: sc.BAD_REQUEST,
            success: false,
            message: '빈칸 존재',
            });
        }

        const signup = await authService.signup(name, tel, nok_tel);
        if (signup) {
            return res.status(sc.OK).json({
                status: sc.OK,
                success: true,
                message: "회원가입 성공",
                data: signup,
            });
        }else{ //null. 이미 전화번호가 사용되었다면
            return res.status(sc.BAD_REQUEST).json({
                status: sc.BAD_REQUEST,
                success: false,
                message: "회원가입 실패. 이미 사용되었거나 잘못된 전화번호",
            });
        }
    }catch(error){
        console.log(error);
        res.status(sc.INTERNAL_SERVER_ERROR).json({
            status: sc.INTERNAL_SERVER_ERROR,
            success: false,
            message: '서버 오류',
        });
    }
};

/**
 *  @route POST /auth/login
 *  @desc login
 *  @access Private
 */
const login = async (req, res) =>{
    try{
        //reqest에 이미 쿠키가 있는 경우 -> 이미 로그인한 경우
        if (req.cookies.x_auth){
            return res.status(sc.BAD_REQUEST).json({
            status: sc.BAD_REQUEST,
            success: false,
            message: '이미 로그인 상태(토큰 이미 존재)',
            });
        }

        const { name, tel } = req.body;
        //빈칸이 있다면
        if(!name || !tel){
            return res.status(sc.BAD_REQUEST).json({
            status: sc.BAD_REQUEST,
            success: false,
            message: '빈칸 존재',
            });
        }

        const token = await authService.login(name, tel); //성공시 토큰 반환
        if (token) {
            return res.cookie("x_auth", token)
            .status(sc.OK).json({
                status: sc.OK,
                success: true,
                message: "로그인 성공",
                data: {name: name, 
                    tel: tel},
            });
        }else{
            return res.status(sc.NOT_FOUND).json({
                status: sc.NOT_FOUND,
                success: false,
                message: "로그인 실패. 틀린 입력",
            });
        }
    }catch(error){
        console.log(error);
        res.status(sc.INTERNAL_SERVER_ERROR).json({
            status: sc.INTERNAL_SERVER_ERROR,
            success: false,
            message: '서버 오류',
        });
    }
};

export default {
    signup,
    login,
};