import dotenv from 'dotenv';

dotenv.config();

const port = Number.parseInt(process.env.PORT ?? '4000', 10);

export const env = {
  clientUrl: process.env.CLIENT_URL ?? 'http://127.0.0.1:5173',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number.isNaN(port) ? 4000 : port,
};
