import express from "express"
import { likeRouter } from "./like.router.js"
import { rateRoute } from "./rate.route.js"
import { orderRoute } from "./order.route.js"

export const rootRouter = express.Router()

rootRouter.use("/like",likeRouter),
rootRouter.use("/rate",rateRoute),
rootRouter.use("/order",orderRoute)