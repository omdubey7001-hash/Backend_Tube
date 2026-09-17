import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

 //routes
import userRouter from "./routes/user.route.js"


//routes declaration
app.use("/api/v1/users", userRouter)

//this line i am changing to see that i can push the code or not




export { app }