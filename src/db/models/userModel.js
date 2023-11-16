import { UserSchema } from "../schemas/userSchema.js";
import mongoose from "mongoose";

export const User = mongoose.model("User",UserSchema);