import { PostSchema } from "../schemas/postSchema.js";
//import { errGenerator } from "../../../errGenerator.js";
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

        if(!removedPost){
            return { result : null }
        }

        return { result : "deleted" };
    }

    /* 게시글 변경
     업데이트할 게시글 내용, object화 id*/
    async updatePost(postId,data){
        const updatedPost
         = await Post.findByIdAndUpdate(new ObjectId(postId),data,{new:true})

        return updatedPost;
    }

    /* 게시글 보기 (마이페이지)
    사용자 닉네임*/
    async findMyPost(page, pageSize, data){
        const MaxPost = Number(pageSize)
        const hidePost = (Number(page)-1)*MaxPost
        const findedMyPost = await Post.find({nickname : data}).skip(hidePost).limit(MaxPost);

        return findedMyPost;
    }

    /* 모든 게시글 보기 (관리자)*/
    /*async findAllPost(page,pageSize){

        const MaxPost = Number(pageSize)
        const hidePost = (Number(page)-1)*MaxPost
        const findedAllPost = await Post.find({}).skip(hidePost).limit(MaxPost);

        return findedAllPost;
    }*/

    /* 게시글 보기 (id)*/
    async findPost(data){
        const findedAllPost = await Post.findById(new ObjectId(data))

        return findedAllPost;
    }

    /* 게시글 검색 -> 반환값이 무조건 빈배열 */
    async searchPost(data){
        const { word, board_category, product_category, event_date, event_location, page, pageSize } = data;
        console.log(data)
        let filter = {};
        if(word){
             filter={$or:[
                {title:{ $regex: word, $options: 'i' }}, 
                {content:{ $regex: word, $options: 'i' }}
             ]}
             
            //filter.title = word
        }    
        if(board_category){
            filter.board_category = board_category
        }
        if(product_category){
            filter.product_category = product_category
        }
        if(event_date){
            filter.event_date = event_date
        }
        if(event_location){
            filter.event_location = event_location;
        }
        console.log(filter)

        //const MaxPost = Number(pageSize)
        //const hidePost = (Number(page)-1)*MaxPost

        const searchResult = await Post.find(filter)
        //.skip(hidePost).limit(MaxPost);

        return searchResult;
    }
}

const postModel = new PostModel();
export { postModel };
