import { errGenerator } from "../../errGenerator.js";
import asyncHandler from "express-async-handler"
import { User } from "../db/models/userModel.js";

//회원가입시 이메일과 닉네임이 이미 존재하면 에러를 반환
export const duplicateCheckUser = asyncHandler(async (req,res,next)=>{
        const {email,nickname}=req.body

        const sameEmail = await User.findOne({email})
        const sameNickname = await User.findOne({nickname});

        if(sameEmail&&sameNickname){
                throw errGenerator("중복된 이메일과 닉네임이 존재합니다.",409,{});
        }
        if(sameEmail){
                throw errGenerator("중복된 이메일이 존재합니다.",409,{});
        }
        if(sameNickname){
                throw errGenerator("중복된 닉네임이 존재합니다.",409,{});
        }
        next();
})