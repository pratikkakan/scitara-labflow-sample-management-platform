import { Router } from 'express';

import {
  createSample,
  getSampleById,
  listSamples,
} from '../controllers/sample.controller.js';
import { validateSamplePayload } from '../middleware/validate-sample-payload.js';

const router = Router();

router.get('/', listSamples);
router.get('/:sampleId', getSampleById);
router.post('/', validateSamplePayload, createSample);

export default router;
