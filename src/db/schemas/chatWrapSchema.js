import { Schema } from "mongoose";

const ChatWrapSchema = new Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      roomId: {
        type: String,
        required: true,
      },
      
    },
    {
      timestamps: true,
      collection: "chatWrap",
    }
  );
  
  export { ChatWrapSchema };