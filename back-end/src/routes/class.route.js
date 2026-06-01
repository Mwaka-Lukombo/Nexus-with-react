import  Router from 'express';
import { 
    commentActivite,
    commentClass,
    createActivites,
    createClass,
    createMaterial,
    deleteClass,
    deleteMaterial,
    getClasses,
    getClassSingle,
    students
 } from '../controllers/class.controller.js';
import { 
    isTeacher, 
    protectedRoute  
} from '../middleware/protected.js';
import {upload} from '../lib/multer.js';





const router = Router();


router.use(protectedRoute)

router.get('/',getClasses);
router.get('/students',students);
router.post('/createClass',isTeacher,createClass);
router.post('/createActivite',createActivites);
router.post('/commentActivite',commentActivite);
router.post('/commentClass',commentClass);
router.post('/createWork/:id',upload.single("file") ,createMaterial);
router.delete('/classSingle/:id',deleteClass);
router.delete('/material/:classRoomId/:materialId',deleteMaterial);
router.get('/classSingle/:id',getClassSingle);


export default router;









