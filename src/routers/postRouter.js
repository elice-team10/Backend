import express from "express";
const postRouter = express.Router();
import asyncHandler from 'express-async-handler'
import { postModel } from '../db/models/postModel.js'
import { checkToken } from "../middlewares/checkToken.js";
import { sameUser } from "../middlewares/sameUser.js";
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


//관리자&마이페이지 - 게시글 가져오기
postRouter.get('/:nickname',asyncHandler(async (req, res, next) => {  //checkToken,
    const {page,pageSize}=req.query;
    const findedPost
        = await postModel.findMyPost(page,pageSize,req.params.nickname)

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
    const data=req.query;

    const findedPost
        = await postModel.searchPost(data)

    res.status(200).send(findedPost);
}))


//게시글 작성
postRouter.post('/',upload.single('picture'),asyncHandler(async (req, res, next) => { //checkToken, 
    let newPost = req.body
    let picture = ""

    if(req.file){
        picture="/storage/"+req.file.filename
        newPost.picture=picture
    }

    const createdNewPost= await postModel.createPost(newPost)

    res.status(200).send(createdNewPost);
}))


//게시글 수정하기
postRouter.put('/:postId',upload.single('picture'),asyncHandler(async (req, res, next) => { //checkToken, sameUser
    let newPost = req.body
    let picture = ""
    const postId=req.params.postId

    if(req.file){
        picture="/storage/" + req.file.filename
        newPost.picture=picture
    }

    const changedPost

        = await postModel.updatePost(postId,newPost)

    res.status(200).send(changedPost)
}))


// 게시글 삭제하기
postRouter.delete('/:postId',asyncHandler(async (req, res, next) => { //checkToken ,sameUser
    const deleted
        = await postModel.removePost(req.params.postId);

    res.status(200).json(deleted);
}))

//검색기능 테스트
/*postRouter.get('/search', asyncHandler(async (req, res, next) => {  
    const data = req.query;
    console.log(data)

    const searchResult = await postModel.searchPost(data);

    res.status(200).send(searchResult);
}))*/


export { postRouter };
