import healthRoutes from './health.routes.js';
import sampleRoutes from './sample.routes.js';

const routeModules = [
  { path: '/health', router: healthRoutes },
  { path: '/samples', router: sampleRoutes },
];

export function registerRoutes(app) {
  routeModules.forEach(({ path, router }) => {
    app.use(path, router);
  });
}
