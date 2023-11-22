import express from "express";
const postRouter = express.Router();
import asyncHandler from 'express-async-handler'
import { postModel } from '../db/models/postModel.js'
import { checkToken } from "../middlewares/checkToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

import multer from "multer";

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,process.env.storagePath);
  },
  filename:function(req,file,cb){
    const filename=
      new Date().getTime().toString().slice(0,8)+"-"+file.originalname;
    req.filename=filename;
    cb(null,filename);
  }
});

const upload = multer({storage})


//마이페이지 - 게시글 가져오기
postRouter.get('/:nickname',asyncHandler(async (req, res, next) => {  //checkToken,
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
postRouter.post('/',upload.single('picture'),asyncHandler(async (req, res, next) => { //checkToken, 
    let newPost = req.body 
    const picture="/storage/"+req.file.filename
    console.log(picture)
    newPost.picture=picture
    const createdNewPost= await postModel.createPost(newPost)

    res.status(200).send(createdNewPost);
}))


//게시글 수정하기
postRouter.put('/:postId',asyncHandler(async (req, res, next) => { //checkToken, sameUser

    const post = req.body;
    const postId=req.params.postId
    const changedPost
        = await postModel.updatePost(postId,post)

    res.status(200).send(changedPost)
}))


// 게시글 삭제하기
postRouter.delete('/:postId',asyncHandler(async (req, res, next) => { //checkToken ,sameUser
    const deleted
        = await postModel.removePost(req.params.postId);

    res.status(200).json(deleted);
}))


export { postRouter };
