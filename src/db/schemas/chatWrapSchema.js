import { Schema } from "mongoose";

const ChatWrapSchema = new Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      roomId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
      },
      oppenent: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
      collection: "chatWrap",
    }
  );
  
  export { ChatWrapSchema };