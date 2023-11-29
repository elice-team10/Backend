import { CommentSchema } from "../schemas/comment-schema.js";
import mongoose from "mongoose";

export const Comment = mongoose.model("Comment",CommentSchema);
const ObjectId = mongoose.Types.ObjectId;

class CommentModel{
    /* 새 코멘트 생성
    { 사용자 닉네임, 내용(콘텐트), 게시글id } */
    async createComment(newComment){
        try{
            const createdComment = await Comment.create(newComment)
            return createdComment;
        }catch(e){
            throw e;
        }
        
    }

    /* 코멘트 삭제
    코멘트 id*/
    async removeComment(data){
        try{
            const removedComment
            = await Comment.findByIdAndDelete(new ObjectId(data));
            
            if(!removedComment ){
                return { result : null }
            }

            return { result : "deleted" };
        }catch(e){
            throw e;
        }
    }

    /*게시글 삭제 시 
    포스트 id*/
    async removeAllComment(data){
        try{
            await Comment.deleteMany({postId : new ObjectId(data)});

        }catch(e){
            throw e;
        }
    }

    /* 코멘트 수정
    코멘트 id, 업데이트할 내용(콘텐트)*/
    async updateComment({content, commentId}){
        try{
            const updatedComment
            = await Comment.findByIdAndUpdate(new ObjectId(commentId),{content})

            return updatedComment;
        }catch(e){
            throw e;
        }
        
    }

    // 회원 탈퇴 시 코멘트 삭제
    async userDeleteComment(data){
        try{
            const deletedComment
             = await Comment.deleteMany({userId : data._id});
            //await Comment.deleteMany({userId : new ObjectId(data)});


            return ;
        }catch(e){
            throw e;
        }
    }

    /* 코멘트 보기 (관리자&마이페이지)
    사용자 닉네임*/
    async findMyComment(data){
        try{
            let filter={}
            if(data.status===1){
                filter.userId=data._id
            }
            //const MaxPost = Number(pageSize)
            //const hidePost = (Number(page)-1)*MaxPost
            const findedMyComment = await Comment.find(filter).populate('postId').populate('userId')//.skip(hidePost).limit(MaxPost);

            return findedMyComment;
        }catch(e){
            throw e;
        }
    }

    /* 글에서 코멘트 보기
    게시글id */
    async findPostComment(data){
        try{
            const findedPostComment = await Comment.find({postId:data}).populate('postId').populate('userId')

            return findedPostComment;
        }catch(e){
            throw e;
        }
        
    }
}

const commentModel = new CommentModel();
export {commentModel};
