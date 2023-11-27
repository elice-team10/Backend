import { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    content: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "chat",
  }
);

export { ChatSchema };
