import { PostSchema } from "../schemas/postSchema.js";
import mongoose from "mongoose";
export const Post = mongoose.model("Post", PostSchema);

const ObjectId = mongoose.Types.ObjectId;

class PostModel {
    /* 새 게시글 생성 */
    async createPost(postInfo) {
        const createdPost = await Post.create(postInfo);

        return createdPost;
    }

    /* 게시글 삭제
    게시글 id*/
    async removePost(data) {
        const removedPost = await Post.findByIdAndDelete(new ObjectId(data));

        if (!removedPost) {
            return { result: null };
        }

        return { result: "deleted" };
    }

    /* 게시글 변경
     업데이트할 게시글 내용, object화 id*/
    async updatePost(postId, data) {
        const updatedPost = await Post.findByIdAndUpdate(
            new ObjectId(postId),
            data,
            { new: true }
        );

        return updatedPost;
    }

    /* 게시글 보기 (관리자&마이페이지)
    사용자 닉네임*/
    async findMyPost(data) {
        let filter = {};
        if (data.status === 1) {
            filter.userId = data._id;
        }

        const findedMyPost = await Post.find(filter).populate("userId");

        return findedMyPost;
    }

    /* 게시글 보기 (id)*/
    async findPost(data) {
        const findedAllPost = await Post.findById(new ObjectId(data)).populate(
            "userId"
        );

        return findedAllPost;
    }

    /* 게시글 검색 -> 반환값이 무조건 빈배열 */
    async searchPost({
        word,
        board_category,
        product_category,
        event_date,
        event_location,
        limit
    }) {
        let filter = {};
        if (word) {
            filter = {
                $or: [
                    { title: { $regex: word, $options: "i" } },
                    { content: { $regex: word, $options: "i" } },
                ],
            };
        }
        if (board_category) {
            filter.board_category = board_category;
        }
        if (product_category) {
            filter.product_category = product_category;
        }
        if (event_date) {
            filter.event_date = event_date;
        }
        if (event_location) {
            filter.event_location = event_location;
        }

        const MaxPost = Number(limit)
        //const hidePost = Number(page)*MaxPost

        const searchResult = await Post.find(filter).populate("userId").limit(MaxPost);

        return searchResult;
    }
}
const postModel = new PostModel();
export { postModel };
