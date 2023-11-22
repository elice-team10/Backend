import { PostSchema } from "../schemas/postSchema.js";
import { errGenerator } from "../../../errGenerator.js";
import mongoose from "mongoose";

export const Post = mongoose.model("Post",PostSchema);
const ObjectId = mongoose.Types.ObjectId;

class PostModel{
    /* 새 게시글 생성 */
    async createPost(postInfo){
        const createdPost = await Post.create(postInfo)
        
        return createdPost;
    }

    /* 게시글 삭제
    게시글 id*/
    async removePost(data){
        const removedPost = await Post.findByIdAndDelete(new ObjectId(data))
        // mongoDB에서 id를 어떤 이름으로 지정하는지 확인

        return { result : "deleted" };
    }

    /* 게시글 변경
     업데이트할 게시글 내용, object화 id*/
    async updatePost(postId,data){
     
        const updatedPost
         = await Post.findByIdAndUpdate(new ObjectId(postId),data)

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

        const findedAllPost = await Post.find()

        return findedAllPost;
    }

    /* 게시글 보기 (id)*/
    async findPost(data){
        
        const findedAllPost = await Post.findById(new ObjectId(data))

        return findedAllPost;
    }

}

const postModel = new PostModel();
export {postModel};
