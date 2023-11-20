import { Schema } from "mongoose";
export const UserSchema = new Schema({
    email:{type:String,required: true, unique: true},
    nickname:{type:String,required: true, unique: true },
    password:{type:String,required: true},
    status:{type:Number,default:1},  //0번: 관리자 1번:일반유저
},{versionKey : false,timestamps:true,collection:"users"})

