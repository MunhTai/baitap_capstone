import { reponseSuccsess } from "../common/helper/response.helper.js";
import { statusCodes } from "../common/helper/status_code.helper.js";
import { authService } from "../services/auth.service.js";

export const authController = {
   async create(req, res, next) {

         const result = await authService.register(req);
         const response = reponseSuccsess(result, `Tạo tài khoản thành công`);
         //res.status(response.statusCode) sẽ trả về statusCode trong trường hợp xảy ra,đây là statusCode thật ở http
         //json(response) trả dữ liệu cho client ở dạng json
         res.status(response.statusCode).json(response);
   },
   async login(req,res,next){
      const result = await authService.login(req);
      const response = reponseSuccsess(result,'Đăng nhập thành công')
      res.status(statusCodes.OK).json(response)
   },
   async getInfo(req,res,next){
      const result = await authService.getInfo(req);
      const response = reponseSuccsess(result,'Lấy thông tin user thành công')
      res.status(statusCodes.OK).json(response)
   },


};