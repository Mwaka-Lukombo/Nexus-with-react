import Router from 'express';
import { deleteNotification, deleteNotifications, getNotify, readNotify } from '../controllers/notification.controller.js';
import { protectedRoute } from '../middleware/protected.js';


const router = Router();



router.use(protectedRoute);

router.get('/getNotifications',getNotify);
router.patch('/readNotification',readNotify);
router.delete('/deleteNotifications',deleteNotifications);
router.delete('/deleteNotification/:id',deleteNotification);


export default router;