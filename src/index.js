import { createRequire } from "module";
const require = createRequire(import.meta.url); //import와 require 동시에 사용

import express from "express";
import routes from './routes/index.js';
import config from './config/index.js';
import cors from 'cors';

const app = express()

let corsOptions = {
    origin: '*', //출처 허용 옵션
};

app.use(cors(corsOptions));

app.use(express.json()); //JSON 문자열이 넘어오는 경우 객체로 변환
app.use(express.urlencoded({ extended: false })); //요청 본문의 데이터를 req.body 객체로 생성

app.use("/", routes);

app.get("/", (req, res, next) => {
    res.send('Hello World!');
});

app.listen(config.port, () => {
    console.log(`
    ################################################
            🛡️  Server listening on port 🛡️
    ################################################
    `);
});

export default {
    app
};