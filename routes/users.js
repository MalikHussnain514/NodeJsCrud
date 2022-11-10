import express from 'express';
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../controllers/users.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.post('/create', createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;
