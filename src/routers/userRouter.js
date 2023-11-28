import { Router } from "express";
import { userModel } from "../db/models/userModel.js";
import { checkToken } from "../middlewares/checkToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import asyncHandler from "express-async-handler"
import { checkLogin } from "../middlewares/checkLogin.js";
import { duplicateCheckUser } from "../middlewares/duplicateCheckUser.js";


const userRouter = Router();

//전체 유저확인(관리자용)
userRouter.get('/',checkToken,isAdmin,asyncHandler(async (req,res,next)=>{//
        //const {page,pageSize}=req.query;
        const userData = await userModel.getUsers();
        res.status(200).json(userData);
}))

//특정 유저확인
userRouter.get('/detail',checkToken,asyncHandler(async (req,res,next)=>{
        const userData = req.user;
        res.status(200).json(userData);
}))

//로그인
userRouter.post('/login',checkLogin,asyncHandler(async (req,res,next)=>{

        const {_id,status,nickname}=req.user;
        const token=await userModel.loginUser(_id)
        res.status(200).json({token,status,nickname});
        // .cookie("loginToken",token,{httpOnly:true,maxAge:1000*60*60*3,sameSite:'None',secure:false})
        
}))

//회원가입
userRouter.post('/join',duplicateCheckUser,asyncHandler(async (req,res,next)=>{

        const {email,nickname,password}=req.body
        await userModel.joinUser(email,nickname,password)
        res.status(201).send("success")
}))

//비밀번호찾기
userRouter.post('/findPW',asyncHandler(async (req,res,next)=>{
        const email=req.body.email
        await userModel.findPassword(email)
        res.status(201).send(`새 비밀번호를 ${email}로 보냈습니다.`)
}))

//회원정보수정
userRouter.put('/',checkToken,duplicateCheckUser,asyncHandler(async (req,res,next)=>{
        const userData = req.user
        const {email,nickname,password,newPassword,profileImg}=req.body
        await userModel.updateUser(userData,email,nickname,password,newPassword,profileImg)
        res.status(201).send("success")
}))

//유저탈퇴
userRouter.delete('/',checkToken, asyncHandler( async (req,res,next)=>{
        const userData = req.user;
        await userModel.delUser(userData);
        res.status(204).send("success"); 
        //.cookie("loginToken","",{httpOnly:true,maxAge:0})
}))


//회원강제탈퇴(관리자용)
userRouter.delete('/:userId',checkToken,isAdmin,asyncHandler(async (req,res,next)=>{
        const userId = req.params.userId;
        await userModel.delAdminUser(userId);
        res.status(204).send("success");
}))



export {userRouter};