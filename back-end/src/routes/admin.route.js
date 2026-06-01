import {Router} from 'express';
import { 
    createUser,
    deleteUser,
    getAllUsers 

} from '../controllers/admin.controller.js';

import { 
    protectedRoute,
    isAdmin 
} from '../middleware/protected.js';

const router = Router();

router.use(protectedRoute,isAdmin);

router.get('/getAllUsers',getAllUsers);
router.post('/create',createUser);
router.delete('/delete/:id',deleteUser);


export default router;


