import express from "express";
const postRouter = express.Router();
import asyncHandler from 'express-async-handler'
import { postModel } from '../db/models/postModel.js'
import { checkToken } from "../middlewares/checkToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { object } from "webidl-conversions";


//마이페이지 - 게시글 가져오기
postRouter.get('/:nickname',  asyncHandler(async (req, res, next) => {  //checkToken,
    const findedPost
        = await postModel.findMyPost(req.params.nickname)

    res.status(200).send(findedPost);
}))


//게시글 가져오기
//_id = object(_id)

postRouter.get('/detail/:postId', asyncHandler(async (req, res, next) => {  
    
    const findedPost
        = await postModel.findPost(req.params.postId)

    res.status(200).send(findedPost);
}))


//전체 게시글 보기
postRouter.get('/', asyncHandler(async (req, res, next) => {  

    const findedAllPost
        = await postModel.findAllPost()

    res.status(200).send(findedAllPost);
}))


//게시글 작성
postRouter.post('/', asyncHandler(async (req, res, next) => { //checkToken, 
    const newPost = req.body
    const createdNewPost
        = await postModel.createPost(newPost)

    res.status(200).send(createdNewPost);
}))


//게시글 수정하기
postRouter.put('/:postId', asyncHandler(async (req, res, next) => { //checkToken, 

    const post = req.body;
    const postId=req.params.postId
    const changedPost
        = await postModel.updatePost(postId,post)

    res.status(200).send(changedPost)
}))


// 게시글 삭제하기
postRouter.delete('/:postId', asyncHandler(async (req, res, next) => { //checkToken, isAdmin, 
    const deleted
        = await postModel.removePost(req.params.postId);

    res.status(200).json(deleted);
}))


export { postRouter };
