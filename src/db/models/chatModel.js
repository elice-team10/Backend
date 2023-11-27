import { ChatSchema } from "../schemas/chatSchema.js";
import mongoose from "mongoose";

export const Chat = mongoose.model("Chat",ChatSchema)
const ObjectId = mongoose.Types.ObjectId;

class ChatModel {

    // 채팅방이 없으면 하나 만들고, 있으면 있는 객체의 배열 안에 push
    /*async sendMessage(data){
        try{
            const findChatting = await Chat.findOne({nickname : data.nickname, with : data.with})
            if(!findChatting){
                const chatData = {
                    nickname : data.nickname,
                    with : data.with,
                    chat : data.chat,   
                }

                const sendedMessage = await Chat.create(chatData)
                
                return sendedMessage;
            }else{
                if(!data.chat){
                    return findChatting
                }
                findChatting.chat.push(data.chat);
                findChatting.save();

                return findChatting;
            }
            
        }catch(e){
            throw err;
        }
    }
*/
    async makeChatRoom(nick1,nick2){
        try{
            const chatData = {
                nickname : nick1,
                with : nick2,
                chat : [],   
            }
            await Chat.create(chatData)
        return;
        }catch(err){
            throw err;
        }
    }

    async sendMessage(chatRoomId,data){
        try{
            
            await Chat.findByIdAndUpdate(new ObjectId(chatRoomId),{$push:{chat:data}})
            return;
        }catch(err){
            throw err;
        }
    }

    async readMessage(chatRoomId,lastTimestamp){
        try{
            const sendedMessage = await Chat.find(new ObjectId(chatRoomId))

            
            return sendedMessage;
        }catch(err){
           throw err;
        }
    }

    /*async getChatRoom(){
        try{
            const chatRoomData = await Chat.find({})
            return chatRoomData;
        }catch(err){
            throw err;
        }
    }*/
    // 내 모든 채팅방 확인
    async allChat(nick1,nick2){
        try{
            const allMessage = await Chat.find(
            {$or:[
                {nickname1:nick1}, 
                {nickname2:nick2}
             ]})
            return allMessage;
        }catch(e){
            throw err;
        }
    }

    /* 
    async oneChat(){
        try{
            const allMessage = await Chat.find({nickname : data.nickname, with : data.with})
            return allMessage;
        }catch(e){
            throw err;
        }
    }
    */
}

/*  get- 채팅창 모든 내용 불러오기
    post - 채팅 작성
*/ 
const chatModel= new ChatModel()

export { chatModel }