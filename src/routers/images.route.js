import express from 'express';
import { imagesController } from '../controllers/images.controller.js';
import { protect } from '../common/middleware/auth.middleware.js';

const imagesRouter = express.Router();

// Tạo route CRUD
imagesRouter.get('/list', imagesController.findAll);
imagesRouter.get('/:name', imagesController.findByName);
imagesRouter.get('/info/:id', imagesController.info);
imagesRouter.get('/getcomment/:id', imagesController.Comment);
imagesRouter.get('/:id/save', protect, imagesController.checkSave);
imagesRouter.post('/postcomment/:id',protect,imagesController.postComment);
export default imagesRouter;