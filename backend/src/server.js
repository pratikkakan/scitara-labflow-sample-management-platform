import app from './app.js';
import { env } from './config/env.js';

app.listen(env.port, () => {
  console.log(`Sample Management API listening on http://127.0.0.1:${env.port}`);
});
