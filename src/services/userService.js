import { User } from "../db/models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId; //id string 값을 objectid 형식으로 바꿈

class UserService{
    async getUsers(page,pageSize){ //전체 유저를 현재page 기준으로 pageSize만큼만 전송
        try{
            const MaxPost = Number(pageSize)
            const hidePost = (Number(page)-1)*MaxPost
            const usersData = await User.find({}).skip(hidePost).limit(MaxPost);
            return usersData;
        }catch(err){
            console.log("getUsers 오류:")
            throw err;
        }
    }

    async getUser(id){ //토큰으로 받은 id로 특정 유저 정보 전송
        try{
            const usersData = await User.findById(new ObjectId(id))
            return usersData;
        }catch(err){
            console.log("getUser 오류:")
            throw err;
        }
    }

    async loginUser(email,password){ //email과 패스워드를 확인하고 userId 기준으로 토큰 발행
        try{
            const data = await User.findOne({email});

            

            const userId=String(data._id);
            const status=data.status;
            const check = await bcrypt.compare(password,data.password)
            if(check){
                const token= jwt.sign({userId,status},process.env.jwt_key,{expiresIn:"1h"});
                return {
                    token:token
                };
            }
            return;
        }catch(err){
            console.log("loginUser 오류:")
            throw err;
        }
    }


    async joinUser(email,nickname,password){ //회원가입
        
        try{
            const hashedPassword = await bcrypt.hash(password, 5);
            const newUser = {
                email:email,
                nickname:nickname,
                password:hashedPassword,
            }
            await User.create(newUser);
            return;
        }catch(err){
            console.log("joinUser 오류:")
            throw err;
        }
    }

    async modifyUser(id,email,nickname,password){ //회원정보 수정
        
        try{
            const hashedPassword = await bcrypt.hash(password, 5);
            const newUser = {
                email:email,
                nickname:nickname,
                password:hashedPassword,
            }
            await User.findByIdAndUpdate(id,newUser);
            return;
        }catch(err){
            console.log("joinUser 오류:")
            throw err;
        }
    }

    async delUser(id){ //토큰으로 id를 받아 유저 삭제
        try{
            await User.findByIdAndDelete(new ObjectId(id));
            return;
        }catch(err){
            console.log("delUser 오류:")
            throw err;
        }
    }
}

const userService = new UserService();
export {userService};