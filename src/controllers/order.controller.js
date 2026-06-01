import { reponseSuccsess } from "../common/helper/response.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js"
import { orderService } from "../services/order.service.js"

export const orderController = {
    async newOrder(req,res,next){
        //gọi service
        const result = await orderService.createOrder(req);

        const response = reponseSuccsess(
            result
        )

        res.json(response)
    }
}