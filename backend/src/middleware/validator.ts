import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import { sendError } from '../utils/apiResponse';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendError(
      res,
      errors.array().map(err => err.msg).join(', '),
      'Validation Error',
      400
    );
    return;
  }
  next();
};

export const boardValidators = {
  create: [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Board title is required')
      .isLength({ max: 255 })
      .withMessage('Board title cannot exceed 255 characters'),
    body('backgroundColor')
      .optional()
      .matches(/^#[0-9A-F]{6}$/i)
      .withMessage('Invalid color format')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid board ID'),
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Board title cannot be empty')
      .isLength({ max: 255 })
      .withMessage('Board title cannot exceed 255 characters'),
    body('backgroundColor')
      .optional()
      .matches(/^#[0-9A-F]{6}$/i)
      .withMessage('Invalid color format')
  ]
};

export const listValidators = {
  create: [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('List title is required')
      .isLength({ max: 255 })
      .withMessage('List title cannot exceed 255 characters'),
    body('boardId')
      .isMongoId()
      .withMessage('Invalid board ID'),
    body('position')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Position must be a non-negative integer')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid list ID'),
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('List title cannot be empty')
      .isLength({ max: 255 })
      .withMessage('List title cannot exceed 255 characters'),
    body('position')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Position must be a non-negative integer')
  ]
};

export const cardValidators = {
  create: [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Card title is required')
      .isLength({ max: 500 })
      .withMessage('Card title cannot exceed 500 characters'),
    body('listId')
      .isMongoId()
      .withMessage('Invalid list ID'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 5000 })
      .withMessage('Card description cannot exceed 5000 characters'),
    body('position')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Position must be a non-negative integer')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid card ID'),
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Card title cannot be empty')
      .isLength({ max: 500 })
      .withMessage('Card title cannot exceed 500 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 5000 })
      .withMessage('Card description cannot exceed 5000 characters'),
    body('position')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Position must be a non-negative integer'),
    body('listId')
      .optional()
      .isMongoId()
      .withMessage('Invalid list ID')
  ]
};