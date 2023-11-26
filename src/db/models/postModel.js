import { PostSchema } from "../schemas/postSchema.js";
//import { errGenerator } from "../../../errGenerator.js";
import mongoose from "mongoose";
import { CommentSchema } from "../schemas/comment-schema.js";
export const Post = mongoose.model("Post",PostSchema);
export const Comment = mongoose.model("Comment",CommentSchema);
const ObjectId = mongoose.Types.ObjectId;

class PostModel{
    /* 새 게시글 생성 */
    async createPost(postInfo){
        try{
            const createdPost = await Post.create(postInfo)
        
            return createdPost;
        }catch(e){
            throw e;
        }
        
    }

    /* 게시글 삭제
    게시글 id*/
    async removePost(data){
        try{
            const removedPost = await Post.findByIdAndDelete(new ObjectId(data))
            const removedComment = await Comment.deleteMany({postId : new ObjectId(data)});
            

            if(!removedPost && removedComment == 0){
                return { result : null }
            }

            return { result : "deleted" };
        }catch(e){
            throw e;
        }
        
    }

    /* 게시글 변경
     업데이트할 게시글 내용, object화 id*/
    async updatePost(postId,data){
        try{
            const updatedPost
             = await Post.findByIdAndUpdate(new ObjectId(postId),data,{new:true})

            return updatedPost;
        }catch(e){
            throw e;
        }
        
    }

    /* 게시글 보기 (마이페이지)
    사용자 닉네임*/
    async findMyPost(data){
        try{
            //const MaxPost = Number(pageSize)
            //const hidePost = (Number(page)-1)*MaxPost
            const findedMyPost = await Post.find({nickname : data})//.skip(hidePost).limit(MaxPost);

            return findedMyPost;
        }catch(e){
            throw e;
        }
        
    }

    /* 모든 게시글 보기 (관리자)*/

    async findAllPost(){
        try{
            //const MaxPost = Number(pageSize)
            //const hidePost = (Number(page)-1)*MaxPost
            const findedAllPost = await Post.find({})//.skip(hidePost).limit(MaxPost);
            return findedAllPost;
        }catch(e){
            throw e;
        }

    }

    /*async findAllPost(page,pageSize){

            return findedAllPost;
        }catch(e){
            throw e;
        }
    }
        
    }*/


    /* 게시글 보기 (id)*/
    async findPost(data){
        try{
            const findedAllPost = await Post.findById(new ObjectId(data))

            return findedAllPost;
        }catch(e){
            throw e;
        }
        
    }

    /* 게시글 검색 -> 반환값이 무조건 빈배열 */
    async searchPost(data){
        try{
            const { word, board_category, product_category, event_date, event_location } = data;
            const filter = {};
            if(word){
                filter.$or = [
                    { title: { $regex: word, $options: 'i' } },
                    { context: { $regex: word, $options: 'i' } }
                ]
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

            const searchResult = await Post.find(filter)//.skip(hidePost).limit(MaxPost);

        // const { word, board_category, product_category, event_date, event_location, page, pageSize } = data;
        // console.log(data)
        // let filter = {};
        // if(word){
        //      filter={$or:[
        //         {title:{ $regex: word, $options: 'i' }}, 
        //         {content:{ $regex: word, $options: 'i' }}
        //      ]}
             
        //     //filter.title = word
        // }    
        // if(board_category){
        //     filter.board_category = board_category
        // }
        // if(product_category){
        //     filter.product_category = product_category
        // }
        // if(event_date){
        //     filter.event_date = event_date
        // }
        // if(event_location){
        //     filter.event_location = event_location;
        // }
        // console.log(filter)

        // //const MaxPost = Number(pageSize)
        // //const hidePost = (Number(page)-1)*MaxPost

        // const searchResult = await Post.find(filter)
        // //.skip(hidePost).limit(MaxPost);


            return searchResult;
        }catch(e){
            throw e;
        }
        
    }
}

const postModel = new PostModel();
export { postModel };
