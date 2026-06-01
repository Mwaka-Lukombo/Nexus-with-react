import { Router } from "express";
import { createMessage, deleteMessage, getMessages } from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/protected.js";


const router = Router();


router.use(protectedRoute);

router.get('/:id',getMessages);
router.post('/create/:id',createMessage);
router.delete('/:id',deleteMessage);





export default router;




