import { Router } from 'express';
import {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
} from '../controllers/boardController';
import { boardValidators, validateRequest } from '../middleware/validator';

const router = Router();

router.post('/', boardValidators.create, validateRequest, createBoard);
router.get('/', getAllBoards);
router.get('/:id', getBoardById);
router.put('/:id', boardValidators.update, validateRequest, updateBoard);
router.delete('/:id', deleteBoard);

export default router;