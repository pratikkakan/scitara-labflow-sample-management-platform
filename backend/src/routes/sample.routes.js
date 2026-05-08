import { Router } from 'express';

import {
  createSample,
  deleteSample,
  getSampleById,
  listSamples,
  updateSample,
} from '../controllers/sample.controller.js';
import { validateSamplePayload } from '../middleware/validate-sample-payload.js';

const router = Router();

router.route('/').get(listSamples).post(validateSamplePayload, createSample);
router
  .route('/:id')
  .get(getSampleById)
  .put(validateSamplePayload, updateSample)
  .delete(deleteSample);

export default router;
