
import { reponseSuccsess } from "../common/helper/response.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js"
import { likeService } from "../services/like.service.js"

export const likeController = {
    async findWhereUser(req,res,next){
        //gọi service
        const like = await likeService.findWhereUser(req);

        const response = reponseSuccsess(
            like,
        );
        res.json(response)

    },

    async findWhereRes(req,res,next){
        //gọi service
        const like = await likeService.findWhereRes(req);

        const response = reponseSuccsess(
            like,
        );
        res.json(response)

    }
} 
