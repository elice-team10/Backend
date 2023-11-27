import { errGenerator } from "../../errGenerator.js";
import asyncHandler from "express-async-handler"

export const sameUser = asyncHandler(async (req,res,next)=>{

    if(req.user.status===0){
        return next();
    }

    const tokenUser=String(req.user._id)
    const postUser=req.body.userId

    if(tokenUser!==postUser){
        throw errGenerator("작성자가 일치하지 않습니다.",403,{});
    }   
    
    next();
})