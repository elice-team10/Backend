import express from "express";
import { userRouter } from "./routers/userRouter.js";
import {commentRouter} from "./routers/comment-router.js"

const app = express();

app.use(express.json());

app.use('/api/user',userRouter)


app.use('/api/comment',commentRouter);


app.use((err,req,res,next)=>{
    const status = err.status ? err.status : 500;
    const errMessage = err.message
    console.error(status,errMessage);
    res.status(status).send(errMessage);
})
export {app};