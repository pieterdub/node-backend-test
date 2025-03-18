import express from 'express';
import { evaluateCalculation, recalculateExpressions } from '../controllers/calculationController.js';

const router = express.Router();

router.get('/:id', evaluateCalculation);

router.get('/recalculate/:variableId', recalculateExpressions);

export default router;
