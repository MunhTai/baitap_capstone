import { BadRequestErr } from "../common/helper/exception.helper.js";
import { protect } from "../common/middleware/auth.middleware.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const userService = {

   //lấy danh sách ảnh theo người tạo
   async listCreate(req) {
        const id = req.user.id
         const checkUser = await prisma.users.findUnique({
            where:{
               id:id
            }
        })

        if(!checkUser){
            throw new BadRequestErr('User không tồn tại trong hệ thống')
        }

          //kiểm tra xem có ảnh thuộc userId không
         const existingImages = await prisma.images.findFirst({
           where:{
               user_id:Number(id)
           }
        })

        if(!existingImages){
            throw new BadRequestErr('Không có ảnh do user này đăng')
        }

        const result = await prisma.images.findMany({
            where:{
                user_id:Number(id)
            },
            include:{
                Users:true
            }
        })
         return{
             result,
             message:"Người dùng đã tạo "+result.length+" hình ảnh"
         }

   },

   //lấy danh sách user
   async findAll(req) {
      const result = await prisma.users.findMany({
         where:{
            deleted:false
         }
      })
      if(result.length == 0){
         throw new BadRequestErr("Chưa có user nào tỏng hệ thống")
      }
      return {result,
         message:"Có "+result.length+" user trong hệ thống"
      };
   },

   //danh sách ảnh đã lưu theo id người dùng
   async listSave(req){
      const id_user = req.user.id

      const result = await prisma.save_images.findMany({
         where:{
            user_id:id_user,
         },
         include:{
            images:true
         }
      })

      if(result.length == 0){
         throw new BadRequestErr("User này chưa lưu ảnh nào")
      }

      return {
         result,
         message:'có '+ result.length+' hình ảnh'
      }
   },


   //xóa ảnh theo id
   async remove(req) {
     const {id} = req.params;
     const id_user = req.user.id

      const checkImage = await prisma.images.findFirst({
         where:{
            id:Number(id),
            user_id:id_user
         }
      })
      if (!checkImage) {
         throw new BadRequestErr("Hình ảnh này được đăng bởi user khác, bạn không thể xóa");
      }

      const result = await prisma.images.update({
         where:{
            id:Number(id)
         },
         data:{
            deleted:true
         }
      })

      if(!result){
         throw new BadRequestErr("Hình ảnh này được đăng bởi user khác,bạn không thể xóa")
      }
      return result;
   }
};