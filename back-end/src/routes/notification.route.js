import Router from 'express';
import { getNotify, readNotify } from '../controllers/notification.controller.js';
import { protectedRoute } from '../middleware/protected.js';


const router = Router();



router.use(protectedRoute);

router.get('/getNotifications',getNotify);
router.patch('/readNotification',readNotify);


export default router;