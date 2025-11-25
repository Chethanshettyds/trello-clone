import { Router } from 'express';
import {
  createCard,
  updateCard,
  updateCardPositions,
  deleteCard
} from '../controllers/cardController';
import { cardValidators, validateRequest } from '../middleware/validator';

const router = Router();

router.post('/', cardValidators.create, validateRequest, createCard);
router.put('/positions', updateCardPositions);
router.put('/:id', cardValidators.update, validateRequest, updateCard);
router.delete('/:id', deleteCard);

export default router;