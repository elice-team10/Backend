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


    async loginUser(email,password){ //email과 패스워드를 확인하고 userId 기준으로 토큰 발행
        try{
            const data = await User.findOne({email});

            if(!data){
                throw errGenerator("아이디가 잘못되었습니다.",404,{});
            }

            const userId=String(data._id);
            const check = await bcrypt.compare(password,data.password)

            if(!check){
                throw errGenerator("비밀번호가 잘못되었습니다.",404,{});
            }
            
            const token= jwt.sign({userId},process.env.jwt_key,{expiresIn:"1h"});
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

    async updateUser(userData,email,nickname,password){ //회원정보 수정
        
        try{
            const hashedPassword = await bcrypt.hash(password, 5);
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

    async delAdminUser(id){ // 유저 삭제
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