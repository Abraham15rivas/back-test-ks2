//==================================================
//              DEPENDENCIES
//==================================================
import express from 'express';
const router = express.Router();

//==================================================
//              ROUTES: CRUD Users
//==================================================
import { listUsers, showUser, createUser, updateUser, deleteUser } from '../controllers/user/userController.js';

router.get('/users', listUsers)
router.get('/users/:id', showUser)
router.post('/users', createUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router