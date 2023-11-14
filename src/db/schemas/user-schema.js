import { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    isAdmin:{
      type: Boolean,
      required: true,
    }
  },
  {
    timestamps: true,
    collection: "user"
  }
);

export { UserSchema };
