import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { protect } from '../common/middleware/auth.middleware.js';

const userRouter = express.Router();

// Tạo route CRUD
userRouter.get('/listcreate/',protect ,userController.listcreate);//route danh sách ảnh đã tạo bởi user
userRouter.get('/', userController.findAll);//danh sách user
userRouter.get('/listsave/:id', protect,userController.listSave);//danh sách hình ảnh user đã lưu
userRouter.delete('/remove/:id',protect, userController.remove);//xóa ảnh đã tạo

export default userRouter;