import { info } from "console";
import { reponseSuccsess } from "../common/helper/response.helper.js";
import { statusCodes } from "../common/helper/status_code.helper.js";
import { imagesService } from "../services/images.service.js";

export const imagesController = {
   

   async findAll(req, res, next) {
         const result = await imagesService.findAll(req);
         const response = reponseSuccsess(result,"Lấy danh sách images thành công");
         res.status(statusCodes.OK).json(response);
   },

   async findByName(req, res, next) {
         const result = await imagesService.findByName(req);
         const response = reponseSuccsess(result, `Lấy hình ảnh ${req.params.name} thành công`);
         res.status(statusCodes.OK).json(response);
   },

   async info(req, res, next) {
         const result = await imagesService.info(req);
         const response = reponseSuccsess(result, `Thông tin của ảnh id${req.params.id}`);
         res.status(statusCodes.OK).json(response);
   },

   async Comment(req, res, next) {
         const result = await imagesService.getComment(req);
         const response = reponseSuccsess(result, `Bình luận về ảnh id:${req.params.id}`);
         res.status(statusCodes.OK).json(response);
   },

   async checkSave(req, res, next) {
         const result = await imagesService.checkSave(req);
         const response = reponseSuccsess(result);
         res.status(statusCodes.OK).json(response);
   },

    async postComment(req, res, next) {
         const result = await imagesService.postComment(req);
         const response = reponseSuccsess(result,"Comment hình ảnh thành công");
         res.status(statusCodes.OK).json(response);
   },
};