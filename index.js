import mongoose from "mongoose";
import { app } from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

mongoose
    .connect(process.env.mongooseurl)
    .then(() => console.log("mongoDB 연결에 성공하였습니다"))
    .catch((err) => console.log("mongoDB 연결에 실패하였습니다" + err));

app.listen(process.env.PORT, () => {
    console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
