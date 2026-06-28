import { statusCodes } from "./status_code.helper.js"

export const reponseSuccsess = (data,message = "ok",statusCode = 200) =>{
    return {
        status:"succsess",
        statusCode:statusCode,
        message:message,
        data:data
    }
}

export const responseErr = (message = "Internal Server Error",statusCode = statusCodes.INTERNAL_SERVER_ERROR,stack) =>{
    return{
        status:"error",
        statusCode: statusCode,
        message:message,
        //stack:nơi hiển thị chi tiết lỗi bao gồm đường dẫn đến lỗi,chỉ nên in ra ở môi trường dev,không nên in ra trong production
        stack:stack,
    };
};