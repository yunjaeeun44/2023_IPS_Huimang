import jwt from "jsonwebtoken";
import config from '../config/index.js';
import sc from '../modules/statusCode.js';

const verifyToken = (req, res, next) => {
    try{
        const token = req.cookies.x_auth;
        
        if (!token) {
            return res.status(sc.UNAUTHORIZED).json({
                status: sc.UNAUTHORIZED,
                success: false,
                message: '토큰 없음',
            });
        }
        const decoded = jwt.verify(token, config.jwtSecret);
        //만료되었으면 재갱신
        req.body.user = decoded.user;

        next();
    }catch(error){
        res.status(sc.UNAUTHORIZED).json({
            status: sc.UNAUTHORIZED,
            success: false,
            message: '권한 없음',
        });
    }
};

export default verifyToken;