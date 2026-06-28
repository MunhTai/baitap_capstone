import express from "express"
import authRouter from "./auth.route.js"
import imageRouter from "./images.route.js"
import userRouter from "./user.route.js"


export const rootRouter = express.Router()
rootRouter.use("/auth",authRouter),
rootRouter.use('/images',imageRouter),
rootRouter.use('/user',userRouter)

