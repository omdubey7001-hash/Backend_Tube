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


// Return API errors as JSON instead of Express's default HTML error page.
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500

    return res.status(statusCode).json({
        statusCode,
        data: null,
        message: err.message || "Internal server error",
        success: false,
        errors: err.errors || []
    })
})

export { app }
