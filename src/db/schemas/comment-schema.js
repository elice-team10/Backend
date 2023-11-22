import { Schema } from "mongoose";
import {shortId} from "./shortId/shortId.js";


const CommentSchema = new Schema(
  { 
    nickname: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    }
  },
  {
    timestamps: true,
    collection: "comment" // 몽고디비 컬렉션 이름 설정
  }
);

export { CommentSchema };
