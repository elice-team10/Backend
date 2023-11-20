import { errGenerator } from "../../errGenerator.js";
import asyncHandler from "express-async-handler"

export const isAdmin = asyncHandler(async (req,res,next)=>{
        let status=req.user.status;
        if(status===1){
            throw errGenerator("관리자 권한이 없습니다.",403,{});
        }
        next();
})
