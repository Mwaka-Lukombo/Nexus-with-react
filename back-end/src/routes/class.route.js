import  Router from 'express';
import { 
    commentActivite,
    commentClass,
    createActivites,
    createClass,
    getClasses
 } from '../controllers/class.controller.js';
import { 
    isTeacher, 
    protectedRoute  
} from '../middleware/protected.js';



const router = Router();


router.use(protectedRoute)

router.get('/',getClasses);
router.post('/createClass',isTeacher,createClass);
router.post('/createActivite',createActivites);
router.post('/commentActivite',commentActivite);
router.post('/commentClass',commentClass);



export default router;









