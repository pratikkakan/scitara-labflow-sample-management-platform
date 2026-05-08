import app from './app.js';
import { env } from './config/env.js';

function logStartup() {
  console.log([
    '',
    'Sample Management API ready',
    `Environment : ${env.nodeEnv}`,
    `Base URL    : http://${env.host}:${env.port}`,
    `Health Check: http://${env.host}:${env.port}/health`,
    `Samples API : http://${env.host}:${env.port}/samples`,
  ].join('\n'));
}

function handleServerError(error) {
  console.error('Failed to start Sample Management API.');
  console.error(error.message);
  process.exit(1);
}

const server = app.listen(env.port, env.host, logStartup);

server.on('error', handleServerError);
