import { Router } from "express";
import { userModel } from "../db/models/userModel.js";
import { checkToken } from "../middlewares/checkToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import asyncHandler from "express-async-handler"
import { checkLogin } from "../middlewares/checkLogin.js";
import { sameUser } from "../middlewares/sameUser.js";


const userRouter = Router();

//전체 유저확인(관리자용)
userRouter.get('/', asyncHandler(async (req,res,next)=>{
        const {page,pageSize}=req.query;
        const userData = await userModel.getUsers(page,pageSize);
        res.status(200).send(userData);
}))

//특정 유저확인
userRouter.get('/detail',checkToken,asyncHandler(async (req,res,next)=>{
        const userData = req.user;
        res.status(200).send(userData);
}))

//로그인
userRouter.post('/login',checkLogin,asyncHandler(async (req,res,next)=>{

        const {_id,status,nickname}=req.user;
        const token=await userModel.loginUser(_id)
        res.status(200)
        .cookie("loginToken",token,{httpOnly:true,maxAge:1000*60*60*3,sameSite:'None',secure:false})
        .json({token,status,nickname});
}))

//회원가입
userRouter.post('/join',sameUser ,asyncHandler(async (req,res,next)=>{

        const {email,nickname,password}=req.body
        await userModel.joinUser(email,nickname,password)
        res.status(201).send("success")
}))

//회원정보수정
userRouter.put('/',checkToken,asyncHandler(async (req,res,next)=>{
        const userData = req.user
        const {email,nickname,password}=req.body
        await userModel.updateUser(userData,email,nickname,password)
        res.status(201).send("success")
}))

//유저탈퇴
userRouter.delete('/',checkToken, asyncHandler( async (req,res,next)=>{
        const userData = req.user;
        await userModel.delUser(userData);
        res.status(204).cookie("loginToken","",{httpOnly:true,maxAge:0}).send("success");
}))

//로그아웃
userRouter.delete('/logout',checkToken,asyncHandler(async (req,res,next)=>{
        res.status(204)
        .cookie("loginToken","",{httpOnly:true,maxAge:0})
        .send("success");
}));


//회원강제탈퇴(관리자용)
userRouter.delete('/:userId',checkToken,isAdmin,asyncHandler(async (req,res,next)=>{
        const userId = req.params.userId;
        await userModel.delAdminUser(userId);
        res.status(204).send("success");
}))



export {userRouter};