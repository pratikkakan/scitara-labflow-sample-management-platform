import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import apiRoutes from './routes/index.js';

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_request, response) => {
  response.status(200).json({
    message: 'Sample Management API is running.',
    version: 'v1',
  });
});

app.use('/api/v1', apiRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
