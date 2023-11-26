import { ChatSchema } from "../schemas/chatSchema.js";
import mongoose from "mongoose";

export const Chat = mongoose.model("Chat",ChatSchema)

class ChatModel {
    // 채팅방이 없으면 하나 만들고, 있으면 있는 객체의 배열 안에 push
    async sendMessage(data){
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

        /* chat 형태 
            [{sendedBy:"elice", timeStamp:Date.now(),content:'안녕'},
            {sendedBy:"john", timeStamp:Date.now(),content:'안녕'},
            {sendedBy:"elice", timeStamp:Date.now(),content:'가자'}]
        */   

    
    // 내 모든 채팅방 확인
    async allChat(){
        try{
            const allMessage = await Chat.find({nickname : data.nickname})
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

export { ChatModel }