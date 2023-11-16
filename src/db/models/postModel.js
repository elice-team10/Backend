import { PostSchema } from "../schemas/postSchema";
import mongoose from "mongoose";

export const Post = mongoose.model("Post",PostSchema);