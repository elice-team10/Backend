import { ChatSchema } from "../schemas/chatSchema.js";
import { ChatWrapSchema } from "../schemas/chatWrapSchema.js";
import mongoose from "mongoose";

export const Chat = mongoose.model("Chat", ChatSchema);
export const ChatWrap = mongoose.model("ChatWrap", ChatWrapSchema);
const ObjectId = mongoose.Types.ObjectId;

class ChatModel {
    //챗방 만들기
    async makeChatRoom(userId1, userId2) {
        const chatRoom = await Chat.create({});

        const roomId = chatRoom._id;

        const promises = [userId1, userId2].map((userId) => {
            const opponent = userId === userId1 ? userId2 : userId1;

            return ChatWrap.create({
                userId,
                roomId,
                opponent,
            });
        });

        Promise.all(promises);

        return { roomId };
    }

    //채팅 작성
    async sendMessage(roomId, content, nickname) {
        const data = {
            nickname,
            content,
        };

        await Chat.findByIdAndUpdate(new ObjectId(roomId), {
            $push: { content: data },
        });
        return;
    }
    //채팅 내역 불러오기
    async readMessage(roomId) {
        const chatData = await Chat.findById(new ObjectId(roomId));
        return chatData.content;
    }

    //챗방 목록 불러오기
    async getChat(userId) {
        const wrapData = await ChatWrap.find({ userId })
            .populate("roomId")
            .populate("oppenent");
        return wrapData;
    }

    //채팅방 나가기
    async getOutChat(userId, roomId) {
        await ChatWrap.findOneAndDelete({ userId, roomId });
        return;
    }
}

const chatModel = new ChatModel();

export { chatModel };
