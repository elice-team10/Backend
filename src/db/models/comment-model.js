import { CommentSchema } from "../schemas/comment-schema.js";
import mongoose from "mongoose";

const Comment = mongoose.model("comment",CommentSchema);
const ObjectId = mongoose.Types.ObjectId;

class CommentModel{
    /* 새 코멘트 생성
    { 사용자 닉네임, 내용(콘텐트), 게시글id } */
    async createComment(newComment){
        const createdComment = await Comment.create(newComment)
        
        return createdComment;
    }

    /* 코멘트 삭제
    코멘트 id*/
    async removeComment(data){
        const removedComment
         = await Comment.findByIdAndDelete(new ObjectId(data));

        return { result : "deleted" };
    }

    /* 코멘트 변경
    코멘트 id, 업데이트할 내용(콘텐트)*/
    async updateComment({content, commentId}){
        const updatedComment
         = await Comment.findByIdAndUpdate(new ObjectId(commentId),{content})

        return updatedComment;
    }

    /* 코멘트 보기 (마이페이지)
    사용자 닉네임*/
    async findMyComment(data){
        const findedMyComment = await Comment.find({nickname : data})

        return findedMyComment;
    }

    /* 모든 코멘트 보기 (관리자)
    사용자 닉네임*/
    async findAllComment(){
        const findedAllComment = await Comment.find({})

        return findedAllComment;
    }

    /* 글에서 코멘트 보기
    게시글id */
    async findPostComment(data){
    
        const findedPostComment = await Comment.find({postId:data})

        return findedPostComment;
    }
}

const commentModel = new CommentModel();
export {commentModel};
