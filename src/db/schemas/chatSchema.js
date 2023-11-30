import { Schema } from "mongoose";

const MessageSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
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
