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
    async removeComment(data) {
        /*const removedComment = await Comment.findByIdAndDelete(
            new ObjectId(data)
        );*/

        const removedComment = await Comment.deleteMany({
            $or: [{ _id: new ObjectId(data) }, { parentId: data }],
        });

        if (!removedComment) {
            return { result: null };
        }

        return { result: "deleted" };
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
    async findMyComment(data) {
        let filter = {};
        if (data.status === 1) {
            filter.userId = data._id;
        }
        const findedMyComment = await Comment.find(filter)
            .populate("postId")
            .populate("userId");

        return findedMyComment;
    }


    //게시글의 댓글 or 대댓글 찾기
    async findPostComment({postId, parentId}){
            
            const findedPostComment = await Comment.find({postId, parentId}).populate('postId').populate('userId')
            return findedPostComment;

    }
}

const commentModel = new CommentModel();
export {commentModel};
