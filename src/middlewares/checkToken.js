import jwt from "jsonwebtoken";
import { errGenerator } from "../../errGenerator.js";
import { User } from "../db/models/userModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const ObjectId = mongoose.Types.ObjectId;

//헤더에 저장된 토큰의 유무를 체크하고 user데이터 반환
export const checkToken = asyncHandler(async (req, res, next) => {
    const isToken = req.headers.authorization;
    if (!isToken) {
        throw errGenerator("로그인 해주세요", 404, {});
    }

    const tokenData = jwt.verify(isToken.substr(7), process.env.jwt_key);
    const userData = await User.findById(new ObjectId(tokenData.userId));

    if (!userData) {
        throw errGenerator("다시 로그인 해주세요.", 404, {});
    }

    req.user = userData;

    next();
});
