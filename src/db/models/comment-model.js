import { CommentSchema } from "../schemas/comment-schema";
import mongoose from "mongoose";

const comment = mongoose.model("comment",CommentSchema);
