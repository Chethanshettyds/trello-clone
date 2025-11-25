import { Router } from 'express';
import {
  createList,
  updateList,
  updateListPositions,
  deleteList
} from '../controllers/listController';
import { listValidators, validateRequest } from '../middleware/validator';

const router = Router();

router.post('/', listValidators.create, validateRequest, createList);
router.put('/positions', updateListPositions);
router.put('/:id', listValidators.update, validateRequest, updateList);
router.delete('/:id', deleteList);

export default router;