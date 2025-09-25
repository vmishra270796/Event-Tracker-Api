import { body, param } from 'express-validator';

export const createEventValidator = [
  body('title').notEmpty().withMessage('Title required'),
  body('datetime').isISO8601().toDate().withMessage('Valid ISO datetime required'),
  body('location').notEmpty().withMessage('Location required'),
  body('description').optional().isString()
];

export const idParamValidator = [
  param('id').isMongoId().withMessage('Invalid event id')
];
