import express from "express"
import { likeController } from "../controllers/like.controller.js";

export const likeRouter = express.Router();

//method get
likeRouter.get("/user/:user_id",likeController.findWhereUser);
likeRouter.get("/restaurant/:res_id",likeController.findWhereRes);
