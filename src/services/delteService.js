import { Comment } from "../db/models/comment-model.js";
import { Post } from "../db/models/postModel.js";

class DeleteService {
    // 회원 탈퇴 시 게시글&코멘트 삭제
    async userDelete(userId) {

        await Post.deleteMany({userId});
        await Comment.deleteMany({userId});
        
        return;
    }

    //게시글 삭제 시 댓글 삭제
    async removeAllComment(postId) {

        await Comment.deleteMany({postId});

        return;
    }

}

export const deleteService = new DeleteService();
