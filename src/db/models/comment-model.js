import { CommentSchema } from "../schemas/comment-schema.js";
import mongoose from "mongoose";

const Comment = mongoose.model("comment",CommentSchema);

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
         = await Comment.findOneAndDelete({commentId : data})

        return { result : "deleted" };
    }

    /* 코멘트 변경
    코멘트 id, 업데이트할 내용(콘텐트)*/
    async updateComment({nickname, updateContent, postId}){
        const updatedComment
         = await Comment.findOneAndUpdate({postId : postId},{nickname : nickname, content : updateContent})

        return updatedComment;
    }

    /* 코멘트 보기 (마이페이지)
    사용자 닉네임*/
    async findMyComment(nickname){
        const findedMyComment = await Comment.find({nickname : nickname})

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
        const findedPostComment = await Comment.find({postId : data})

        return findedPostComment;
    }
}

const commentModel = new CommentModel();
export {commentModel};
