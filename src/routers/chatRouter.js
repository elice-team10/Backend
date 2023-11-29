import { Router } from "express";
import asyncHandler from "express-async-handler"
import { chatModel } from "../db/models/chatModel.js";
import { checkToken } from "../middlewares/checkToken.js";

const chatRouter = Router();

//챗방목록 가져오기
chatRouter.get('/',checkToken,asyncHandler(async (req,res,next)=>{
    const userId= req.user._id
    const wrapData = await chatModel.getChat(userId);
    res.status(200).json(wrapData)
}))

//챗방만들기
chatRouter.post('/:userId',checkToken,asyncHandler(async (req,res,next)=>{
    const userId1 = req.user._id
    const userId2 = req.params.userId
    const roomId=await chatModel.makeChatRoom(userId1,userId2);
    res.status(201).json(roomId)
}))

//채팅 내역 가져오기
chatRouter.get('/:roomId',asyncHandler(async (req,res,next)=>{
    const roomId=req.params.roomId
    const content = await chatModel.readMessage(roomId);
    res.status(200).json(content)
}))

//채팅 작성
chatRouter.patch('/:roomId',checkToken,asyncHandler(async (req,res,next)=>{
    const {content}=req.body
    const nickname=req.user.nickname
    const timestamps= new Date()
    const roomId=req.params.roomId
    await chatModel.sendMessage(roomId,content,nickname,timestamps);
    res.status(201).send("success")
}))

//챗방 나가기
chatRouter.delete('/:roomId',checkToken,asyncHandler(async (req,res,next)=>{
    const userId = String(req.user._id)
    const roomId=req.params.roomId
    await chatModel.getOutChat(userId,roomId);
    res.status(204).send("success")
}))

export {chatRouter};
