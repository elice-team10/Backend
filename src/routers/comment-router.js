import express from "express";
const commentRouter = express.Router();
import asyncHandler from 'express-async-handler'
import { commentModel } from '../db/models/comment-model.js'
import { checkToken } from "../middlewares/checkToken.js";
import { sameUser } from "../middlewares/sameUser.js";

//관리자&마이페이지 - 작성한 댓글 가져오기
commentRouter.get('/',checkToken,asyncHandler(async (req, res, next) => {  // 
    const userData=req.user
    //const {page,pageSize}=req.query;
    const findedComment
        = await commentModel.findMyComment(userData)

    res.status(200).send(findedComment);
}))


 //게시글의 댓글 or 대댓글 찾기
commentRouter.get('/:postId/:parentId?', asyncHandler(async (req, res, next) => {
    const data = {
        postId: req.params.postId,
        parentId: req.params.parentId,
    }
    
    const findedComment
        = await commentModel.findPostComment(data)

    res.status(200).send(findedComment);
}))



//댓글 달기
commentRouter.post('/:postId/:parentId?',checkToken,asyncHandler(async (req, res, next) => { // 
    const newComment = {
        userId: req.user._id,
        content: req.body.content,
        postId: req.params.postId,
        parentId : req.params.parentId
    }

    const createdNewComment
        = await commentModel.createComment(newComment)

    res.status(200).send(createdNewComment);
}))


//댓글 수정하기
commentRouter.put('/:commentId/:userId?',checkToken,sameUser,asyncHandler(async (req, res, next) => {//
    const comment = {
        content: req.body.content,
        commentId: req.params.commentId,
    }
    const changedComment
        = await commentModel.updateComment(comment)

    res.status(200).send(changedComment)
}))


// 게시글 - 댓글 삭제하기
commentRouter.delete('/:commentId/:userId?',checkToken,sameUser,asyncHandler(async (req, res, next) => { //

    const deleted
        = await commentModel.removeComment(req.params.commentId);

    res.status(200).json(deleted);
}))



export { commentRouter };
