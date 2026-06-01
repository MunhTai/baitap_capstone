import express from "express"
import { rateController } from "../controllers/rate.controller.js";

export const rateRoute = express.Router();

//method post
rateRoute.post("/add_rate",rateController.createRate),

//method get
rateRoute.get("/restaurants/:res_id",rateController.findRateRes),
rateRoute.get("/users/:user_id",rateController.findRateUser)