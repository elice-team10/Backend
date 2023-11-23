import { CommentSchema } from "../schemas/comment-schema.js";
import mongoose from "mongoose";

export const Comment = mongoose.model("Comment",CommentSchema);
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

    /* 코멘트 수정
    코멘트 id, 업데이트할 내용(콘텐트)*/
    async updateComment({content, commentId}){
        const updatedComment
         = await Comment.findByIdAndUpdate(new ObjectId(commentId),{content})

        return updatedComment;
    }

    /* 코멘트 보기 (마이페이지)
    사용자 닉네임*/
    async findMyComment(page,pageSize,data){
        const MaxPost = Number(pageSize)
        const hidePost = (Number(page)-1)*MaxPost
        const findedMyComment = await Comment.find({nickname : data}).skip(hidePost).limit(MaxPost).populate('postId');

        return findedMyComment;
    }

    /* 모든 코멘트 보기 (관리자)
    사용자 닉네임*/

    async findAllComment(page,pageSize){
        const MaxPost = Number(pageSize)
        const hidePost = (Number(page)-1)*MaxPost
        const findedAllComment = await Comment.find({}).skip(hidePost).limit(MaxPost).populate('postId');
        
        return findedAllComment;
    }

    /* 글에서 코멘트 보기
    게시글id */
    async findPostComment(data){
        const findedPostComment = await Comment.find({postId:data}).populate('postId')

        return findedPostComment;
    }
}

const commentModel = new CommentModel();
export {commentModel};
