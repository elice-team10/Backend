import express from "express";
import { userRouter } from "./routers/userRouter.js";
import {postRouter} from "./routers/postRouter.js"
import {commentRouter} from "./routers/comment-router.js";
import { chatRouter } from "./routers/chatRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import {join,dirname} from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storagePath = join(__dirname,'..','storage');
process.env.storagePath=storagePath;
console.log(process.env.storagePath)

const app = express();

app.use("/storage",express.static(storagePath))


app.use(cors({
    origin: ['http://localhost:4000','http://kdt-sw-6-team10.elicecoding.com'],
    credentials: true,
  }));
app.use(express.json());
//app.use(cookieParser());

app.use('/api/chat',chatRouter);

app.use('/api/user',userRouter)

app.use('/api/post', postRouter);

app.use('/api/comment',commentRouter);

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.message).json(err.res || {})

})
export {app};
