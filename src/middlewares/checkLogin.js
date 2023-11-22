import { User } from "../db/models/userModel.js";
import asyncHandler from "express-async-handler"
import { errGenerator } from "../../errGenerator.js";
import bcrypt from "bcrypt";

//로그인시 아이디와 비밀번호를 체크하고 에러를 반환
export const checkLogin = asyncHandler(async (req,res,next)=>{
    const {email,password}=req.body

    const data = await User.findOne({email});

    if(!data){
        throw errGenerator("아이디가 잘못되었습니다.",404,{});
    }

    const check = await bcrypt.compare(password,data.password)

    if(!check){
        throw errGenerator("비밀번호가 잘못되었습니다.",404,{});
    }
    
    req.user = data;

    next();
})
