import { verifyAccessToken } from "../helper/jwt.helper.js"
import { prisma } from "../prisma/connect.prisma.js"
import {UnauthorizedError} from "../helper/exception.helper.js"
import jwt from "jsonwebtoken";
import { error } from "node:console";


//nhận request từ client
export const protect = async (req,res,next) => {
    try{
    //B1:lấy token từ header Authorization
    const tokenHeader = req.headers.authorization
     
    //b2:kiểm tra token có hợp lệ không
    if(!tokenHeader || !tokenHeader.startsWith("Bearer ")){
        throw new UnauthorizedError("Token không hợp lệ")   
    }

    //tách Bearer ra,lấy token đúng format
    const accessToken = tokenHeader.split(" ")[1]

    //xác thực token
    const decoded = verifyAccessToken(accessToken);

    //kiểm tra user có hoặc còn tồn tại trong db không
    const userExist = await prisma.users.findUnique({
        where:{
            id:decoded.userId
        }
    })

    if(!userExist){
        throw new UnauthorizedError("Tài khoản không còn tồn tại")
    }

    req.user = userExist
    next()
    } catch(error){
        if(error instanceof jwt.TokenExpiredError)// bắt lỗi liên quan đến token hết hạn
        {
            throw new UnauthorizedError("Access token đã hết hạn")
        }

        if(error instanceof jwt.JsonWebTokenError)// bắt tất cả các lỗi liên quan đến jwt,bao gồm các lỗi liên quan đến token
        {
            // throw new UnauthorizedError("Token không hợp lệ")
               console.log("Error name:", error.name);
               console.log("Error message:", error.message);
               console.log(error);
        }
        next(error)

    }
   
    
}


