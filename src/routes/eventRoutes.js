import { Router } from 'express';
import {
  createEvent,
  listEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  enableShare,
  disableShare,
  viewShared
} from '../controllers/eventController.js';
import { requireAuth } from '../middleware/auth.js';
import { createEventValidator, idParamValidator } from '../validators/eventValidators.js';

const router = Router();

// Public shared view
router.get('/shared/:slug', viewShared);

// Authenticated event CRUD
router.use(requireAuth);
router.get('/', listEvents);
router.post('/', createEventValidator, createEvent);
router.get('/:id', idParamValidator, getEvent);
router.put('/:id', idParamValidator.concat(createEventValidator), updateEvent);
router.delete('/:id', idParamValidator, deleteEvent);
router.post('/:id/share', idParamValidator, enableShare);
router.delete('/:id/share', idParamValidator, disableShare);

export default router;
