import { Router } from "express";
import asyncHandler from "express-async-handler"
import { chatModel } from "../db/models/chatModel.js";
import { checkToken } from "../middlewares/checkToken.js";

const chatRouter = Router();

//챗방목록 가져오기
chatRouter.get('/',checkToken,asyncHandler(async (req,res,next)=>{
    const nickname= req.user.nickname
    const RoomsData = await chatModel.allChat(nickname);
    res.status(200).json(RoomsData)
}))

//챗방만들기
chatRouter.post('/',asyncHandler(async (req,res,next)=>{
    const {nick1,nick2}=req.body
    await chatModel.makeChatRoom(nick1,nick2);
    res.status(200).send("success")
}))

//채팅 내역 가져오기
chatRouter.get('/:chatRoomId',asyncHandler(async (req,res,next)=>{
    const chatRoomId=req.params.chatRoomId
    //const lastTimestamp=req.query.lastTimestamp
    const RoomData = await chatModel.readMessage(chatRoomId);
    res.status(200).json(RoomData)
}))

//채팅 작성
chatRouter.post('/:chatRoomId',asyncHandler(async (req,res,next)=>{
    const chatData=req.body
    const chatRoomId=req.params.chatRoomId
    await chatModel.sendMessage(chatRoomId,chatData);
    res.status(200).send("success")
}))

export {chatRouter};