import { PostSchema } from "../schemas/postSchema.js";
import { errGenerator } from "../../../errGenerator";

import mongoose from "mongoose";

const Post = mongoose.model("post",PostSchema);

class PostModel{
    /* 새 게시글 생성 */
    async createPost(postInfo){
        console.log(postInfo)
        const createdPost = await Post.create(postInfo)
        
        return createdPost;
    }

    
    /* 게시글 삭제
    게시글 id*/
    async removePost(data){
        const removedPost = await Post.findOneAndDelete({postId : data})
        // mongoDB에서 id를 어떤 이름으로 지정하는지 확인

        return { result : "deleted" };
    }

    /* 게시글 변경
     업데이트할 게시글 내용, object화 id*/
    async updatePost(data){
     
        const updatedPost
         = await Comment.findOneAndUpdate({postId:data.postId},data)

        return updatedPost;
    }

    /* 게시글 보기 (마이페이지)
    사용자 닉네임*/
    async findMyPost(nickname){
        const findedMyPost = await Post.find({nickname : nickname})

        return findedMyPost;
    }

    /* 모든 게시글 보기 (관리자)*/
    async findAllPost(){
        const findedAllPost = await Post.find({})

        return findedAllPost;
    }

    /* 게시글 보기 (id)*/
    async findPost(data){
        const findedAllPost = await Post.findOne({postId:data})

        return findedAllPost;
    }

}

const postModel = new PostModel();
export {postModel};


