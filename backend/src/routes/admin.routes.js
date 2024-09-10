import { Router } from 'express';
import { verifyAccessToken, verifyAdmin } from '../middlewares/auth.middleware.js';
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllStats } from '../controllers/admin.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/create-course').post(
    verifyAccessToken,
    verifyAdmin,
    upload.single('image'),
    createCourse
)

router.route('/add-lecture/:id').post(
    verifyAccessToken,
    verifyAdmin,
    upload.single('video'),
    addLecture
)

router.route('/delete-lecture/:id').delete(
    verifyAccessToken,
    verifyAdmin,
    deleteLecture
)

router.route('/delete-course/:id').delete(
    verifyAccessToken,
    verifyAdmin,
    deleteCourse
)

router.route('/get-stats').get(
    verifyAccessToken, 
    verifyAdmin, 
    getAllStats
);

export default router;