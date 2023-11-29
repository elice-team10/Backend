import { Schema } from "mongoose";

const MessageSchema = new Schema(
    {
        nickname: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ChatSchema = new Schema(
    {
        content: {
            type: [MessageSchema],
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "chat",
    }
);

export { ChatSchema };
