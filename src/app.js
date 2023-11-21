import express from "express";
import { userRouter } from "./routers/userRouter.js";
import {postRouter} from "./routers/postRouter.js"
import {commentRouter} from "./routers/comment-router.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

app.use(cors({
    origin: ["http://localhost:3000","http://kdt-sw-6-team10.elicecoding.com"],
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRouter)

app.use('/api/post', postRouter);

app.use('/api/comment',commentRouter);

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.message)
})
export {app};
g