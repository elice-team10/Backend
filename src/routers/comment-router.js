import express from "express";
const commentRouter = express.Router();

import {commentModel} from '../db/models/comment-model.js'


//마이페이지 - 작성한 댓글 가져오기
commentRouter.get('/:nickname', async (req, res, next) => {
    try {
        const findedComment
         = await commentModel.findMyComment(req.params.nickname)

         res.status(200).send(findedComment);
    } catch (e) {
        next(e)
    }
})


//게시글 - 댓글 가져오기
commentRouter.get('/:postId', async (req, res, next) => {
    try {
        const findedPostComment
         = await commentModel.findPostComment(req.params.postId)

         res.status(200).send(findedPostComment);
    } catch (e) {
        next(e)
    }
})


 //관리자페이지 - 전체 댓글 보기
commentRouter.get('/', async (req, res, next) => {
    try {
        const findedAllComment
         = await commentModel.findAllComment()

         res.status(200).send(findedAllComment);
    } catch (e) {
        next(e)
    }
})


//댓글 달기
commentRouter.post('/', async (req, res, next) => {
    try {
        const newComment = {
            nickname: req.body.nickname,
            content: req.body.content,
            postId: req.body.postId,
        }
        console.log(req.body)
        const createdNewComment
         = await commentModel.createComment(newComment)

        res.status(200).send(createdNewComment);
    } catch (e) {
        next(e)
    }
})


//댓글 수정하기
commentRouter.put('/:commentId', async (req, res, next) => {
    try {
        const comment = {
            nickname : req.body.nickname,
            updateContent : req.body.content,
            postId: req.body.postId,
        }
        const changedComment
         = await commentModel.updateComment(comment)

        res.status(200).send(changedComment)
    } catch (e) {
        next(e)
    }
})


// 게시글 - 댓글 삭제하기
commentRouter.delete('/:commentId', async (req, res, next) => {
    try {
        const deleted
         = await commentModel.removeComment(req.params.commentId);
         
        res.status(200).json(deleted);
    } catch (e) {
        next(e)
    }
})


export {commentRouter};