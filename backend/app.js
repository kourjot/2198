import express from 'express';
import "dotenv/config"
import {db} from "./db.js"
import {userRouter} from "./router/userRouter.js"
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors())
app.use("/user", userRouter);
app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
    db();
})