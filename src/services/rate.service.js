import { prisma } from "../common/prisma/connect.prisma.js"; 

export const rateService = {
    async createRate(req){
        const rate_new  = req.body;
        const result = await prisma.rate_res.create({
            data:{
                user_id:rate_new.user_id,
                res_id:rate_new.res_id,
                amount:rate_new.amount,
                date_rate: new Date(),
            }
        });

        return result;

    },

    async findRateRes(req){
        const {res_id}  = req.params;
        const result = await prisma.rate_res.findMany({
            where:{
                res_id:Number(res_id)
            }
        });

        return result;

    },

    async findRateUser(req){
        const {user_id}  = req.params;
        const result = await prisma.rate_res.findMany({
            where:{
                user_id:Number(user_id)
            }
        });

        return result;

    },
}