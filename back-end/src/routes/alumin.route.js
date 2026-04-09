import { Router } from "express";
import { isOldStudent, protectedRoute } from "../middleware/protected.js";
import { 
    breakingNews, 
    comment, 
    createNotices, 
    deleteNotice, 
    getComments, 
    getNews, 
    getNoticeSingle, 
    likeNotice, 
    myNotices, 
    myNoticeStored, 
    myStoredNoticesProfile, 
    noticeStore, 
    oldStudents, 
    opportunites, 
    updateNotice

} from "../controllers/alumin.controller.js";


const router = Router();

router.use(protectedRoute);

router.get('/',getNews);
router.get('/oldStudents',oldStudents);
router.get('/myStored',myNoticeStored);
router.get('/myStoredPorfile',myStoredNoticesProfile);
router.get('/opportunites',opportunites);
router.get('/breakingNews',breakingNews);
router.get('/noticeSingle/:id',getNoticeSingle)
router.get('/getComments/:id',getComments);
router.post('/noticeStore/:id',noticeStore);
router.post('/comment/:id',comment);
router.post('/like/:id',likeNotice);

//Old Students
router.use(isOldStudent);

router.get('/myNotices',myNotices);
router.post('/create',createNotices);
router.patch('/updateNotice/:id',updateNotice);
router.delete('/:id',deleteNotice);


export default router;





