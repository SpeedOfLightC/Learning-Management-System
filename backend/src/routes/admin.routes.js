import { Router } from 'express';
import { verifyAccessToken, verifyAdmin } from '../middlewares/auth.middleware.js';
import { createCourse } from '../controllers/admin.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/create-course').post(
    verifyAccessToken,
    verifyAdmin,
    upload.single('image'),
    createCourse
)

export default router;