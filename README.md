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

## Backend API Reference

### Base URL

Local backend server:

```text
http://127.0.0.1:3001
```

All endpoints return JSON except `DELETE /samples/:id`, which returns `204 No Content` on success.

### Endpoint List

| Method | Endpoint | Purpose | Success Code |
| ------ | -------- | ------- | ------------ |
| `GET` | `/health` | Service health check | `200 OK` |
| `GET` | `/samples` | List all samples | `200 OK` |
| `POST` | `/samples` | Create a sample | `201 Created` |
| `GET` | `/samples/:id` | Get a sample by id | `200 OK` |
| `PUT` | `/samples/:id` | Update a sample | `200 OK` |
| `DELETE` | `/samples/:id` | Delete a sample | `204 No Content` |

### Sample Schema

```json
{
  "id": "SMP-1001",
  "sampleName": "Water Quality Control",
  "scientist": "Dr. Maya Chen",
  "status": "Pending"
}
```

Rules:

- `sampleName` is required.
- `scientist` is required.
- `status` is required.
- `status` must be one of `Pending`, `Processing`, or `Completed`.
- `id` is optional on create, but if provided it must be a non-empty string.
- `id` is immutable after creation.

### Request Examples

#### Health Check

```bash
curl --request GET http://127.0.0.1:3001/health
```

#### Create Sample

```bash
curl --request POST http://127.0.0.1:3001/samples \
  --header "Content-Type: application/json" \
  --data '{
    "sampleName": "Water Quality Control",
    "scientist": "Dr. Maya Chen",
    "status": "Pending"
  }'
```

#### List Samples

```bash
curl --request GET http://127.0.0.1:3001/samples
```

#### Get Sample By Id

```bash
curl --request GET http://127.0.0.1:3001/samples/SMP-1001
```

#### Update Sample

```bash
curl --request PUT http://127.0.0.1:3001/samples/SMP-1001 \
  --header "Content-Type: application/json" \
  --data '{
    "sampleName": "Water Quality Control",
    "scientist": "Dr. Maya Chen",
    "status": "Processing"
  }'
```

#### Delete Sample

```bash
curl --request DELETE http://127.0.0.1:3001/samples/SMP-1001
```

### Response Examples

#### `GET /health`

```json
{
  "status": "ok",
  "service": "sample-management-api",
  "timestamp": "2026-05-08T14:01:17.848Z"
}
```

#### `POST /samples` or `GET /samples/:id`

```json
{
  "data": {
    "id": "SMP-1001",
    "sampleName": "Water Quality Control",
    "scientist": "Dr. Maya Chen",
    "status": "Pending"
  }
}
```

#### `GET /samples`

```json
{
  "data": [
    {
      "id": "SMP-1001",
      "sampleName": "Water Quality Control",
      "scientist": "Dr. Maya Chen",
      "status": "Pending"
    },
    {
      "id": "SMP-1002",
      "sampleName": "Cell Viability Panel",
      "scientist": "Dr. Aaron Patel",
      "status": "Processing"
    }
  ]
}
```

#### `DELETE /samples/:id`

Successful delete response:

```text
204 No Content
```

### Status Codes

| Status Code | Meaning | Typical Scenario |
| ----------- | ------- | ---------------- |
| `200` | Success | Health check, list, fetch, or update request succeeded |
| `201` | Created | Sample created successfully |
| `204` | No Content | Sample deleted successfully |
| `400` | Bad Request | Validation failed or request body contains invalid JSON |
| `404` | Not Found | Sample id does not exist or route is unknown |
| `409` | Conflict | Attempted to create a sample with an existing id |
| `500` | Internal Server Error | Unexpected server-side failure |

### Validation Errors

Validation failures return a structured `400 Bad Request` response:

```json
{
  "error": {
    "message": "Validation failed for sample request.",
    "statusCode": 400,
    "details": [
      {
        "field": "sampleName",
        "message": "sampleName is required."
      },
      {
        "field": "scientist",
        "message": "scientist is required."
      },
      {
        "field": "status",
        "message": "status must be one of: Pending, Processing, Completed."
      }
    ]
  }
}
```

Other error examples:

Duplicate id:

```json
{
  "error": {
    "message": "Sample with id \"SMP-1001\" already exists.",
    "statusCode": 409
  }
}
```

Unknown sample:

```json
{
  "error": {
    "message": "Sample with id \"SMP-9999\" was not found.",
    "statusCode": 404
  }
}
```

Invalid JSON:

```json
{
  "error": {
    "message": "Request body must contain valid JSON.",
    "statusCode": 400
  }
}
```
