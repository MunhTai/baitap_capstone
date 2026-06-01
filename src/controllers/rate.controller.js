import { reponseSuccsess } from "../common/helper/response.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js"
import { rateService } from "../services/rate.service.js";

export const rateController = {

    async createRate(req,res,next) {
        //gọi service
        const new_rate = await rateService.createRate(req);

        const response = reponseSuccsess(
            new_rate
        )

        res.json(response);
    },

    async findRateRes(req,res,next) {
        //gọi service
        const result = await rateService.findRateRes(req);

        const response = reponseSuccsess(
            result
        )

        res.json(response);
    },

     async findRateUser(req,res,next) {
        //gọi service
        const result = await rateService.findRateUser(req);

        const response = reponseSuccsess(
            result
        )

        res.json(response);
    },
}