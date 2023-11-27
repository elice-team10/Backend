import { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
    chatRoomId:{
      type : String,
      required : true
    }
  },
  { _id: false }
);

const ChatRoomSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
      
    },
    with: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "chat",
  }
);

export { ChatSchema };


