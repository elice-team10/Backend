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
      type: String,
      required: true,
    },
    commentId:{
      ...shortId
    },
  },
  {
    timestamps: true,
    collection: "comment" // 몽고디비 컬렉션 이름 설정
  }
);

export { CommentSchema };
