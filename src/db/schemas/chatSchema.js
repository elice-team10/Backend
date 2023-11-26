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
    nickname: {
      type: String,
      required: true,
    },
    with: {
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


