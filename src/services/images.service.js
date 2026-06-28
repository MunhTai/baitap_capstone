import { BadRequestErr } from "../common/helper/exception.helper.js";
import { reponseSuccsess } from "../common/helper/response.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const imagesService = {

   //lấy danh sách ảnh
   async findAll(req) {
      const listImages = await prisma.images.findMany({
        where:{
            deleted:false//kiểu dữ liệu tinyint nên trả về true/false
        }
      });

      if(listImages.length == 0){
         throw new BadRequestErr("Chưa có hình ảnh trong hệ thống")
      }

      //trả về dữ liệu hiển thị
      return {listImages,
         message:"Có "+listImages.length+" hình ảnh trong hệ thống"
      }

   },

   //lấy hình ảnh theo tên
   async findByName(req) {
      const {name} = req.params
      const result = await prisma.images.findMany({
        where:{
            image_name:{
               contains:name //tìm các từ khóa trùng khớp với {name}
            },
            deleted:false
        }
      });
      if(result.length == 0){
         throw new Error("Không có hình ảnh phù hợp với từ khóa")
      }
      
      return {
         result, 
         message:"Có "+result.length+" hình ảnh"
      }
   },

   //lấy thông tin hình ảnh qua id
   async info(req) {
      const {id} = req.params
      const result = await prisma.images.findFirst({
         where:{
            id:Number(id),
            deleted:false
         },
         include:{
            Users:{
               select:{
                  id:true,
                  name:true,
                  email:true,
                  created_at:true,
                  updated_at:true
               }
            }
         }
      })
      if(!result){
         throw new Error("Không có hình ảnh với ID phù hợp")
      }

      return {
         result
      }
   },

   //lấy comment theo id ảnh
   async getComment(req) {
      const {id} = req.params;
      const result = await prisma.comments.findMany({
         where:{
            image_id:Number(id),
            deleted:false
         },
        select: {
            id: true,
            content: true,
            created_at: true,
            updated_at: true,
            Users: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
      })
      
      if(result.length == 0){
         throw new Error("Không có bình luận về ảnh này")
      }

      return{
         result,
         message:"Có "+result.length+" comment về ảnh"
      } 
      
   },

   //kiểm tra user đã lưu ảnh chưa
   async checkSave(req){
      const {id} = req.params
      const id_user = req.user.id

      const result = await prisma.save_images.findFirst({
         where:{
            user_id:id_user,
            image_id:Number(id)
         }
      })
      //kiểm tra user đã lưu hình ảnh này chưa
      let isSaved = true
      if(!result){
         isSaved = false
      }
      else{
         isSaved = true
      }

       return {
        imageId: Number(id),
        isSaved:isSaved
    };
   },


   //bình luận về ảnh
   async postComment(req){
      const id_user = req.user.id
      const {id} = req.params
      const result = await prisma.comments.create({
         data:{
            content:req.body.content,
            user_id:id_user,
            image_id:Number(id)
         }
      })

      return result
   }
};