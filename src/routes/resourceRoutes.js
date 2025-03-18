import express from 'express';
import { getResourceLineage } from '../controllers/resourceController.js';

const router = express.Router();

router.get('/lineage/:id', getResourceLineage);

export default router;
