import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import { registerRoutes } from './routes/index.js';

const app = express();

app.disable('x-powered-by');
app.use(
  cors({
    origin: env.clientUrl,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_request, response) => {
  response.status(200).json({
    message: 'Sample Management API is running.',
    health: '/health',
  });
});

registerRoutes(app);
app.use(notFound);
app.use(errorHandler);

export default app;
