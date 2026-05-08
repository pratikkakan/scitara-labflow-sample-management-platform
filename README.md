# scitara-labflow-sample-management-platform
LabFlow Sample Management System is a full-stack scientific workflow application built with React, Node.js, Express, and Playwright. It demonstrates API, UI, and end-to-end automation using automation-first design principles, scalable architecture, workflow validation, and enterprise-level SDET best practices.

## Monorepo Structure

```text
.
├── backend/    # Express API with routes, controllers, middleware, and services
├── docs/       # Assignment and product documentation
├── frontend/   # React + Vite client application
└── tests/      # Playwright TypeScript automation for API and UI
```

## Workspace Scripts

Run these commands from the repository root:

- `npm install`
- `npm run backend:start`
- `npm run frontend:start`
- `npm run test:playwright`

## Technology Choices

- `backend`: Node.js, Express, Helmet, CORS, Morgan, Nodemon
- `frontend`: React, React Router, Vite
- `tests`: Playwright with TypeScript, fixtures, page objects, API utilities
