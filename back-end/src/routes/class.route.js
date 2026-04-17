import  Router from 'express';
import { 
    commentActivite,
    commentClass,
    createActivites,
    createClass,
    deleteClass,
    getClasses,
    getClassSingle,
    students
 } from '../controllers/class.controller.js';
import { 
    isTeacher, 
    protectedRoute  
} from '../middleware/protected.js';



const router = Router();


router.use(protectedRoute)

router.get('/',getClasses);
router.get('/students',students);
router.post('/createClass',isTeacher,createClass);
router.post('/createActivite',createActivites);
router.post('/commentActivite',commentActivite);
router.post('/commentClass',commentClass);
router.delete('/classSingle/:id',deleteClass);
router.get('/classSingle/:id',getClassSingle);


export default router;









