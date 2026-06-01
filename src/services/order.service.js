import { prisma } from "../common/prisma/connect.prisma.js"; 

export const orderService = {
    async createOrder(req){
        const order_new = req.body
        const result = await prisma.order.create({
            data:{
                user_id:order_new.user_id,
                food_id:order_new.food_id,
                amount:order_new.amount,
                code:order_new.code,
                arr_sub_id:order_new.arr_sub_id
            }
        });
        return result;
    }
} 