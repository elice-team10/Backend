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

            // 댓글 삭제시 대댓글도 삭제되는 부분 - 테스트 안해봄
            const removeCommentComment
            = await Comment.deleteMany({parentId : new ObjectId(data)})


            if(!removedComment){
                return { result : null }
            }

            return { result : "deleted" };

    }

    /*게시글 삭제 시 
    포스트 id*/
    async removeAllComment(data){

            await Comment.deleteMany({postId : new ObjectId(data)});

    }

    /* 코멘트 수정
    코멘트 id, 업데이트할 내용(콘텐트)*/
    async updateComment({content, commentId}){
            const updatedComment
            = await Comment.findByIdAndUpdate(new ObjectId(commentId),{content})
            return updatedComment;
    }

    // 회원 탈퇴 시 코멘트 삭제
    async userDeleteComment(data){

            const deletedComment
             = await Comment.deleteMany({userId : data._id});
            //await Comment.deleteMany({userId : new ObjectId(data)});


            return ;

    }

    /* 코멘트 보기 (관리자&마이페이지)
    사용자 닉네임*/
    async findMyComment(data){

            let filter={}
            if(data.status===1){
                filter.userId=data._id
            }
            //const MaxPost = Number(pageSize)
            //const hidePost = (Number(page)-1)*MaxPost
            const findedMyComment = await Comment.find(filter).populate('postId').populate('userId')//.skip(hidePost).limit(MaxPost);

            return findedMyComment;

    }

    /* 글에서 코멘트 보기 (댓글만)
    게시글id */
    async findPostComment(data){

            const findedPostComment = await Comment.find({ postId: data, parentId:":parentId" }).populate('postId').populate('userId')

            return findedPostComment;

    }

    //대댓글만 가져오기 postId, parentId
    async findCommentComment({postId, parentId}){

            const findedPostComment = await Comment.find({postId:postId, parentId:parentId}).populate('postId').populate('userId')
            return findedPostComment;

    }
}

const commentModel = new CommentModel();
export {commentModel};
