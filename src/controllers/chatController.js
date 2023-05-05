import express from 'express';
import { chatService } from "../service/index.js";

/**
 *  @route POST /chat/
 *  @desc chat with GPT
 *  @access Private
 */
const postChat = async (req, res) => {
    const data = req.body;
    try {
        const postChat = await chatService.chatGPT(data);
        return res.status(200).json({
            status: 200,
            success: true,
            message: "채팅 전송 성공",
            data: postChat,
        });
    }catch (error){
        console.log(error);
        res.status(400).json({
        status: 400,
        success: false,
        message: error.message,
        });
    }
};

export default {
    postChat,
};