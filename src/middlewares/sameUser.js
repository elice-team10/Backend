import { errGenerator } from "../../errGenerator.js";
import asyncHandler from "express-async-handler"

export const sameUser = asyncHandler(async (req,res,next)=>{
    if(req.user.status===0){
        next();
    }
    console.log(req)
    const tokenNickname=String(req.user._id)
    const postNickname=req.body.userId
    console.log(tokenNickname)
    console.log(postNickname)
    if(tokenNickname!==postNickname){
        throw errGenerator("작성자가 일치하지 않습니다.",403,{});
    }   
    
    next();
})