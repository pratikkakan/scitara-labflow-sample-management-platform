import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_HOST = '127.0.0.1';
const DEFAULT_PORT = 3001;

const port = Number.parseInt(process.env.PORT ?? String(DEFAULT_PORT), 10);

export const env = {
  clientUrl: process.env.CLIENT_URL ?? 'http://127.0.0.1:5173',
  host: process.env.HOST ?? DEFAULT_HOST,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number.isNaN(port) ? DEFAULT_PORT : port,
};
