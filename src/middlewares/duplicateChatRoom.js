import { errGenerator } from "../../errGenerator.js";
import asyncHandler from "express-async-handler";
import { ChatWrap } from "../db/models/chatModel.js";


export const duplicateChatRoom = asyncHandler(async (req, res, next) => {
    const userId1 = req.user._id;
    const userId2 = req.params.userId;

    const sameData = await ChatWrap.findOne({userId:userId1,opponent:userId2});

    if (sameData) {
        throw errGenerator("이미 해당 유저와는 채팅방이 존재합니다.", 409, {});
    }

    next();
});