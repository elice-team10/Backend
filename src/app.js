import express from "express";
import { userRouter } from "./routers/userRouter.js";
<<<<<<< HEAD
import {commentRouter} from "./routers/comment-router.js"
import {postRouter} from "./routers/postRouter.js"
=======
import {commentRouter} from "./routers/comment-router.js";
import cookieParser from "cookie-parser";
import cors from "cors";
>>>>>>> 43009cbdd4c2b505a69410ce1876efb3d9a93067

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRouter)
<<<<<<< HEAD
app.use('/api/post', postRouter);
=======

//app.use('/api/user',postRouter)

>>>>>>> 43009cbdd4c2b505a69410ce1876efb3d9a93067
app.use('/api/comment',commentRouter);

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.message)
})
export {app};
