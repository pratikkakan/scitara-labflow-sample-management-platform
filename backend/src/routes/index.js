import { Router } from 'express';

import healthRoutes from './health.routes.js';
import sampleRoutes from './sample.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/samples', sampleRoutes);

export default router;
