import { errGenerator } from "../../errGenerator.js";
import asyncHandler from "express-async-handler";

//해당 계정이 관리자가 아니면 에러를 반환
export const isAdmin = asyncHandler(async (req, res, next) => {
    const status = req.user.status;
    if (status === 1) {
        throw errGenerator("관리자 권한이 없습니다.", 403, {});
    }
    next();
});
