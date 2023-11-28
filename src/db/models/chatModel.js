import { ChatSchema } from "../schemas/chatSchema.js";
import { ChatWrapSchema } from "../schemas/chatWrapSchema.js";
import mongoose from "mongoose";

export const Chat = mongoose.model("Chat",ChatSchema)
export const ChatWrap = mongoose.model("ChatWrap",ChatWrapSchema)
const ObjectId = mongoose.Types.ObjectId;

class ChatModel {

    async makeChatRoom(userId1,userId2){
        try{
            const chatRoom=await Chat.create({})
            
            const chatData1 = {
                userId : userId1,
                roomId : chatRoom._id
            };
            const chatData2 = {
                userId : userId2,
                roomId : chatRoom._id
            }

            await ChatWrap.create(chatData1)
            await ChatWrap.create(chatData2)
        return;
        }catch(err){
            throw err;
        }
    }

    async sendMessage(roomId,content,nickname,timestamps){
        try{
            const data={
                nickname,
                content,
                timestamps
            }

            await Chat.findByIdAndUpdate(new ObjectId(roomId),{$push:{content:data}})
            return;
        }catch(err){
            throw err;
        }
    }

    async readMessage(roomId){
        try{
            const chatData = await Chat.findById(new ObjectId(roomId))
            return chatData.content;
        }catch(err){
           throw err;
        }
    }

    // 내 모든 채팅방 확인
    async getChat(userId){
        try{
            const wrapData = await ChatWrap.find({userId})
            return wrapData
        }catch(err){
            throw err;
        }
    }

    async getOutChat(userId,roomId){
        try{

            await ChatWrap.findOneAndDelete({userId,roomId})
            return
        }catch(err){
            throw err;
        }
    }
}


const chatModel= new ChatModel()

export { chatModel }