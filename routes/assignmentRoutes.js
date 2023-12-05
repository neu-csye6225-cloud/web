import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController.js';
import { checkToken } from '../services/auth.js';

const router = Router();

router.get('/v2/assignments', checkToken, assignmentController.getAllAssignments);
router.post('/v2/assignments', checkToken, assignmentController.createAssignment);
router.get('/v2/assignments/:id', checkToken, assignmentController.getAssignmentById);
router.delete('/v2/assignments/:id',checkToken,assignmentController.deleteAssignment);
router.put('/v2/assignments/:id', checkToken, assignmentController.updateAssignment);
router.post('/v2/assignments/:id/submission',checkToken, assignmentController.createSubmission);

export default router;