import { Router } from "express";
import authRoute from './auth.route.js';
import userRoute from './user.route.js';
import campusRoute from './campus.route.js';
import messageRoute from './message.route.js';
import forumRoute from './forum.route.js';
import aluminRoute from './alumin.route.js';
import notificationRoute from './notification.route.js';
import adminRoute from './admin.route.js';
import classRoute from './class.route.js';

const router = Router();

//All routes

router.use('/api/auth',authRoute);
router.use('/api/user',userRoute);
router.use('/api/alumin',aluminRoute);
router.use('/api/campus',campusRoute);
router.use('/api/message',messageRoute);
router.use('/api/forum',forumRoute);
router.use('/api/class',classRoute);
router.use('/api/notification',notificationRoute);
router.use('/api/admin',adminRoute);



export default router;