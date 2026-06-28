import { reponseSuccsess } from "../common/helper/response.helper.js";
import { statusCodes } from "../common/helper/status_code.helper.js";
import { userService } from "../services/user.service.js";

export const userController = {
   async listcreate(req, res, next) {
         const result = await userService.listCreate(req);
         const response = reponseSuccsess(result, `Lấy danh sách thành công`);
         res.status(statusCodes.OK).json(response);
   },

   async findAll(req, res, next) {
         const result = await userService.findAll(req);
         const response = reponseSuccsess(result, `Lấy danh sách user thành công`);
         res.status(statusCodes.OK).json(response);
   },

   async listSave(req, res, next) {
         const result = await userService.listSave(req);
         const response = reponseSuccsess(result, `Danh sách hình ảnh đã lưu của user${ req.user.id}`);
         res.status(response.statusCode).json(response);
   },

   async remove(req, res, next) {
         const result = await userService.remove(req);
         const response = reponseSuccsess(result, `Xóa hình ảnh ${req.params.id} thành công`);
         res.status(statusCodes.OK).json(response);
   }
};