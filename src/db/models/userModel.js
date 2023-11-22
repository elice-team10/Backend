import { UserSchema } from "../schemas/userSchema.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errGenerator } from "../../../errGenerator.js";

export const User = mongoose.model("User",UserSchema);
const ObjectId = mongoose.Types.ObjectId;

class UserModel{
    async getUsers(page,pageSize){ //전체 유저를 현재page 기준으로 pageSize만큼만 전송
        try{
            const MaxPost = Number(pageSize)
            const hidePost = (Number(page)-1)*MaxPost
            const usersData = await User.find({}).skip(hidePost).limit(MaxPost);
            return usersData;
        }catch(err){
            throw err
        }
    }


    async loginUser(userId){ //email과 패스워드를 확인하고 userId 기준으로 토큰 발행
        try{
            const token= jwt.sign({userId},process.env.jwt_key,{expiresIn:"3h"});
            return token;
        }catch(err){
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
            throw err;
        }
    }

    async updateUser(userData,email,nickname,password,newPassword){ //회원정보 수정
        
        try{
            let hashedPassword =undefined;
            let check=false;
            if(password){
                check = await bcrypt.compare(password,userData.password)
                if(!check) throw errGenerator("비밀번호가 잘못되었습니다.",404,{});
                else if(newPassword) hashedPassword = await bcrypt.hash(newPassword, 5);
            }           
            
            const newUser = {
                email:email,
                nickname:nickname,
                password:hashedPassword,
            }

            await User.updateOne(userData,newUser);
            return;
        }catch(err){
            throw err;
        }
    }

    async delUser(userData){ // 유저 삭제
        try{
            await User.deleteOne(userData);
            return;
        }catch(err){
            throw err;
        }
    }

    async delAdminUser(id){ // 유저 삭제(관리자용)
        try{
            await User.findByIdAndDelete(new ObjectId(id));
            return;
        }catch(err){
            throw err;
        }
    }
}

const userModel = new UserModel();
export { userModel };