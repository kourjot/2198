import express from 'express';
import "dotenv/config"
import {db} from "./db.js"
import {userRouter} from "./router/userRouter.js"

import {profileRouter} from "./router/profileRouter.js"
import cors from "cors"

const app = express();
app.use(express.json({ limit: '20mb' }));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Disposition'],
    credentials: true 
}));
app.use("/user", userRouter);

app.use("/",profileRouter);
app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
    db();
})