import { Router } from "express";
import { create } from "../controllers/user.controller.js";
import { isAdmin, protectedRoute } from "../middleware/protected.js";

const router = Router();

router.use(protectedRoute);

router.post('/create',isAdmin,create);



export default router;
