import express from 'express';
import { chatService } from "../service/index.js";
import sc from '../modules/statusCode.js';

/**
 *  @route POST /chat/
 *  @desc chat with GPT
 *  @access Private
 */
const postChat = async (req, res) => {
    const data = req.body;
    try {
        if (!data.input){
            return res.status(sc.BAD_REQUEST).json({
                status: sc.BAD_REQUEST,
                success: false,
                message: "빈 값으로 인한 채팅 전송 실패",
            });
        }
        const postChat = await chatService.chatGPT(data);
        return res.status(sc.OK).json({
            status: sc.OK,
            success: true,
            message: "채팅 전송 성공",
            data: postChat,
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
    postChat,
};