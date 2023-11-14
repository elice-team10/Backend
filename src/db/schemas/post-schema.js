import { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    board_category: {
      type: Number,   // 0, 1
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },

    nickname: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    event_date:{
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "post"
  }
);

export { PostSchema };
