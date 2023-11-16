import { Router } from "express";
import { userService } from "../services/userService.js";
import { checkToken } from "../middlewares/checkToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const userRouter = Router();

//전체 유저검색(관리자용)
userRouter.get('/', async (req,res,next)=>{
    try{
        const {page,pageSize}=req.query;
        const userData = await userService.getUsers(page,pageSize);
        res.status(200).send(userData);
    }catch(err){
        next(err);
    }
})

//특정 유저검색
userRouter.get('/detail',checkToken,async (req,res,next)=>{
    try{
        const userId = req.params.userId;
        const userData = await userService.getUser(userId);
        res.status(200).send(userData);
    }catch(err){
        next(err);
    }
})

//로그인
userRouter.post('/login', async (req,res,next)=>{
    try{
        const {email,password}=req.body
        const token=await userService.loginUser(email,password)
        res.status(200).json(token);
    }catch(err){
        next(err);
    }
})

//회원가입
userRouter.post('/join', async (req,res,next)=>{
    try{
        const {email,nickname,password}=req.body
        await userService.joinUser(email,nickname,password)
        res.status(201).send("success")
    }catch(err){
        next(err);
    }
})

//회원정보수정
userRouter.put('/',checkToken,async (req,res,next)=>{
    try{
        const userId = req.params.userId;
        const {email,nickname,password}=req.body
        await userService.modifyUser(userId,email,nickname,password)
        res.status(201).send("success")
    }catch(err){
        next(err);
    }
})

//유저탈퇴
userRouter.delete('/',checkToken,async (req,res,next)=>{
    try{
        const userId = req.params.userId;
        await userService.delUser(userId);
        res.status(204).send();
    }catch(err){
        next(err);
    }
})

//회원강제탈퇴(관리자용)
userRouter.delete('/:userId',checkToken,isAdmin,async (req,res,next)=>{
    try{
        const userId = req.params.userId;
        await userService.delUser(userId);
        res.status(204).send();
    }catch(err){
        next(err);
    }
})

export {userRouter};