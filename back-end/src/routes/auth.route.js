import { Router } from "express";
import { login, logout, me, profile, sign } from "../controllers/auth.controller.js";
import {protectedRoute} from '../middleware/protected.js';

const router = Router();


router.post("/sign",sign);
router.post("/login",login);
router.post('/logout',logout);
router.get("/me",protectedRoute,me);
router.post('/profile',protectedRoute,profile);


export default router;