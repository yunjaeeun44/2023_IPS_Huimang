import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const getToken = (name, tel) => {
    const payload = {
        user: {
            name: name,
            tel: tel,
        }
    };

    const token = jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: '14d' }, //14일 지속
    );
    return token;
};

export default getToken;