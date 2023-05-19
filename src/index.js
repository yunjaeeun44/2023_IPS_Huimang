import { createRequire } from "module";
const require = createRequire(import.meta.url); //import와 require 동시에 사용

import express from "express";
import cookieParser from "cookie-parser";
import redisCli from "./modules/redis.js";
import routes from './routes/index.js';
import config from './config/index.js';
import cors from 'cors';

import { scheduleJob } from "node-schedule";

const mongoose = require("mongoose");

const app = express()

let corsOptions = {
    origin: '*', //출처 허용 옵션
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json()); //JSON 문자열이 넘어오는 경우 객체로 변환
app.use(express.urlencoded({ extended: false })); //요청 본문의 데이터를 req.body 객체로 생성

app.use("/", routes);

app.get("/", (req, res, next) => {
    res.send('Hello World!');
});

mongoose
    .connect(config.mongoURI, {
        dbName: 'YoJuemGutDuel',
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err))
mongoose.set("strictQuery", false);


scheduleJob('0 0 0 * * *', function () {
    console.log('매일 0시 0분 0초');
})

app.listen(config.port, () => {
    console.log(`
    ################################################
            🛡️  Server listening on ${config.port}🛡️
    ################################################
    `);
});

export default {
    app
};