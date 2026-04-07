import Router from 'express';
import { createForum, deleteForum, getAllForuns, getForumSingle, getPosts, postForum } from '../controllers/forum.controller.js';
import { isTeacher, protectedRoute } from '../middleware/protected.js';

const router = Router();


router.use(protectedRoute);


router.get('/',getAllForuns);
router.get('/posts',getPosts);
router.post('/post/:id',postForum);

router.use(isTeacher)

router.get('/singleForum',getForumSingle);
router.post('/',createForum);
router.delete('/:id',deleteForum);

export default router;



