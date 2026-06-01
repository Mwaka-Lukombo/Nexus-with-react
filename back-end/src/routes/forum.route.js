import Router from 'express';
import { 
    createForum, 
    deleteForum, 
    getAllForuns, 
    getForumSingle, 
    postForum 

} from '../controllers/forum.controller.js';
import { isTeacher, protectedRoute } from '../middleware/protected.js';

const router = Router();


router.use(protectedRoute);


router.get('/',getAllForuns);
router.get('/singleForum/:id',getForumSingle);



router.use(isTeacher)

router.post('/',createForum);
router.delete('/:id',deleteForum);

export default router;



