import express from "express"
import { orderController } from "../controllers/order.controller.js";

export const orderRoute = express.Router();

//method post
 orderRoute.use("/orders_new",orderController.newOrder)