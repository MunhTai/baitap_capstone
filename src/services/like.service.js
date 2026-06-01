import { prisma } from "../common/prisma/connect.prisma.js"; 

export const likeService = {
    async findWhereUser(req){
        const {user_id} = req.params;
        const result = await prisma.like_res.findMany({
            where:{
                user_id:Number(user_id),
            }
        });
        
        return result;
    },
    async findWhereRes(req){
        const {res_id} = req.params;
        const result = await prisma.like_res.findMany({
            where:{
                res_id:Number(res_id),
            }
        });
        
        return result;
    }
}