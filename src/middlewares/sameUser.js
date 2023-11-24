import { errGenerator } from "../../errGenerator.js";
import asyncHandler from "express-async-handler"

export const sameUser = asyncHandler(async (req,res,next)=>{
    if(req.user.status===0){
        next();
    }

    const tokenNickname=req.user.nickname
    const postNickname=req.body.nickname

    if(tokenNickname!==postNickname){
        throw errGenerator("작성자가 일치하지 않습니다.",403,{});
    }   
    
    next();
})