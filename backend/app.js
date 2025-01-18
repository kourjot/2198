import express from 'express';
import "dotenv/config"
import {db} from "./db.js"
import {userRouter} from "./router/userRouter.js"

import {profileRouter} from "./router/profileRouter.js"
import cors from "cors"
const allowedOrigins = [
   " http://localhost:5173/ "
];
  
const app = express();
app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
      
      if (origin && allowedOrigins.includes(origin)) {
        callback(null, true); 
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }));
app.use("/user", userRouter);

app.use("/",profileRouter);
app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
    db();
})