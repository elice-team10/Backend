/*import { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    userId1: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId2: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastChat:{
      
    }
  },
  {
    timestamps: true,
    collection: "chat",
  }
);

export { ChatSchema };
*/

import { Schema } from "mongoose";

const IndividualMessageSchema = new Schema(
  {
    sendedBy: {
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
  },
  { _id: false }
);

const ChatSchema = new Schema(
  {
    nickname1: {
      type: String,
      required: true,
    },
    nickname2: {
      type: String,
      required: true,
    },
    chat: [IndividualMessageSchema],
  },
  {
    timestamps: true,
    collection: "chat",
  }
);

export { ChatSchema };
