import { Router } from "express"; 
import { acceptFriends, friendRequest, getAllStudents, getFriendsRequests, getOldStudents, getSingleOld, myFriends, oldProfile, rejectedFriend, removeFriend } from "../controllers/campus.controller.js";
import { isOldStudent, protectedRoute } from "../middleware/protected.js";

const router = Router();



router.use(protectedRoute);

router.get('/',getAllStudents);
router.get('/friend',getFriendsRequests);
router.get('/myFriends',myFriends);
router.post('/friend/:id',friendRequest);
router.post('/friend/accept/:id',acceptFriends);
router.delete('/friend/reject/:id',rejectedFriend);
router.delete('/friend/removeFriend/:id',removeFriend);

// old students

router.use(protectedRoute);
router.get('/oldStudents',getOldStudents);
router.patch('/updateOld',isOldStudent,oldProfile);
router.get('/singleOld/:id',getSingleOld);
 

export default router;



