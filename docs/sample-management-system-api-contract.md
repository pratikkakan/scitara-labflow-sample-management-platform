# API Contract Documentation

## LabFlow Sample Management System

**Document Status:** Draft  
**Document Type:** REST API Contract  
**Content Type:** `application/json`  
**Primary Resource:** `Sample`

## 1. Purpose

This document defines the API contract for the Sample Management System. It covers the sample management endpoints used to create, retrieve, update, and soft delete sample records.

The contract is intended to provide a consistent interface for frontend, backend, QA, and integration teams by documenting:

- Request payloads
- Response payloads
- Validation rules
- Status codes
- Error responses
- Example JSON

## 2. API Conventions

- All request and response bodies use JSON unless otherwise stated.
- All timestamps use ISO 8601 UTC format, for example: `2026-05-08T14:30:00Z`.
- `id` is the system-generated record identifier used in API paths.
- `sampleId` is the business-visible sample identifier and must be unique.
- The business workflow status values are:
  - `Pending`
  - `Processing`
  - `Completed`
- `DELETE /samples/:id` performs a soft delete. The record remains stored for traceability but is removed from default active views.
- Unless explicitly requested, list responses should exclude soft-deleted samples.

## 3. Sample Resource Model

### 3.1 Sample Object

```json
{
  "id": "6a9c8d71-937e-4d0e-92e8-b0d24bf4d2c3",
  "sampleId": "SMP-2026-0001",
  "name": "Water Quality Sample A",
  "sampleType": "Water",
  "owner": "Dr. Asha Mehta",
  "project": "River Monitoring Study",
  "source": "Site 12",
  "notes": "Collected at north bank station.",
  "status": "Pending",
  "isDeleted": false,
  "createdAt": "2026-05-08T14:30:00Z",
  "updatedAt": "2026-05-08T14:30:00Z",
  "deletedAt": null,
  "version": 1
}
```

### 3.2 Lifecycle History Object

Returned primarily in sample detail responses.

```json
{
  "status": "Processing",
  "changedBy": "lab.tech@labflow.internal",
  "changedAt": "2026-05-09T09:15:00Z",
  "comment": "Sample preparation started."
}
```

## 4. Standard Error Response

All non-success responses should use the following structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed.",
    "details": [
      {
        "field": "status",
        "issue": "Status must be one of: Pending, Processing, Completed."
      }
    ],
    "requestId": "req_01JTZ9H9R2ZK0A4T6GQ2X8E6A1"
  }
}
```

### Common Error Codes

| Error Code | Meaning |
| --- | --- |
| `VALIDATION_ERROR` | One or more request fields are missing or invalid |
| `NOT_FOUND` | The requested sample does not exist |
| `DUPLICATE_SAMPLE_ID` | The submitted `sampleId` already exists |
| `INVALID_STATUS_TRANSITION` | The requested status change is not allowed |
| `SAMPLE_ARCHIVED` | The sample is soft-deleted and cannot be updated through normal workflow actions |
| `VERSION_CONFLICT` | The submitted version does not match the latest stored version |
| `UNAUTHORIZED` | The caller is not authenticated |
| `FORBIDDEN` | The caller is authenticated but not allowed to perform the action |
| `INTERNAL_SERVER_ERROR` | An unexpected server-side failure occurred |

## 5. Endpoint Contracts

### 5.1 POST `/samples`

Creates a new sample record.

### Request Payload

```json
{
  "sampleId": "SMP-2026-0001",
  "name": "Water Quality Sample A",
  "sampleType": "Water",
  "owner": "Dr. Asha Mehta",
  "project": "River Monitoring Study",
  "source": "Site 12",
  "notes": "Collected at north bank station."
}
```

### Validation Rules

- `sampleId` is required, must be unique, and should be 1 to 50 characters.
- `name` is required and should be 1 to 150 characters.
- `sampleType` is required and should be 1 to 100 characters.
- `owner` is required and should be 1 to 100 characters.
- `project`, `source`, and `notes` are optional.
- If provided, `notes` should not exceed 2000 characters.
- The server sets the initial status to `Pending`.
- The client cannot set `isDeleted`, `createdAt`, `updatedAt`, `deletedAt`, or `version` during creation.

### Success Response

**Status Code:** `201 Created`

```json
{
  "data": {
    "id": "6a9c8d71-937e-4d0e-92e8-b0d24bf4d2c3",
    "sampleId": "SMP-2026-0001",
    "name": "Water Quality Sample A",
    "sampleType": "Water",
    "owner": "Dr. Asha Mehta",
    "project": "River Monitoring Study",
    "source": "Site 12",
    "notes": "Collected at north bank station.",
    "status": "Pending",
    "isDeleted": false,
    "createdAt": "2026-05-08T14:30:00Z",
    "updatedAt": "2026-05-08T14:30:00Z",
    "deletedAt": null,
    "version": 1
  }
}
```

### Error Responses

| Status Code | When It Applies |
| --- | --- |
| `400 Bad Request` | Malformed JSON or unsupported field types |
| `401 Unauthorized` | Caller is not authenticated |
| `403 Forbidden` | Caller is not allowed to create samples |
| `409 Conflict` | `sampleId` already exists |
| `422 Unprocessable Entity` | Field-level validation failed |
| `500 Internal Server Error` | Unexpected server error |

### 5.2 GET `/samples`

Returns a list of sample records.

### Query Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `status` | string | No | Filters by `Pending`, `Processing`, or `Completed` |
| `owner` | string | No | Filters by owner name |
| `includeDeleted` | boolean | No | When `true`, includes soft-deleted records |
| `page` | integer | No | Page number, default `1` |
| `pageSize` | integer | No | Page size, default `20`, max `100` |

### Validation Rules

- `status` must be one of `Pending`, `Processing`, or `Completed` when provided.
- `includeDeleted` must be `true` or `false`.
- `page` must be greater than or equal to `1`.
- `pageSize` must be between `1` and `100`.

### Success Response

**Status Code:** `200 OK`

```json
{
  "data": [
    {
      "id": "6a9c8d71-937e-4d0e-92e8-b0d24bf4d2c3",
      "sampleId": "SMP-2026-0001",
      "name": "Water Quality Sample A",
      "sampleType": "Water",
      "owner": "Dr. Asha Mehta",
      "project": "River Monitoring Study",
      "source": "Site 12",
      "notes": "Collected at north bank station.",
      "status": "Pending",
      "isDeleted": false,
      "createdAt": "2026-05-08T14:30:00Z",
      "updatedAt": "2026-05-08T14:30:00Z",
      "deletedAt": null,
      "version": 1
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 1
  }
}
```

### Error Responses

| Status Code | When It Applies |
| --- | --- |
| `400 Bad Request` | Invalid query parameter format |
| `401 Unauthorized` | Caller is not authenticated |
| `403 Forbidden` | Caller is not allowed to view samples |
| `422 Unprocessable Entity` | Query validation failed |
| `500 Internal Server Error` | Unexpected server error |

### 5.3 GET `/samples/:id`

Returns a single sample record by system identifier.

### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | System-generated sample record ID |

### Validation Rules

- `id` is required.
- `id` must match the expected identifier format used by the system.

### Success Response

**Status Code:** `200 OK`

```json
{
  "data": {
    "id": "6a9c8d71-937e-4d0e-92e8-b0d24bf4d2c3",
    "sampleId": "SMP-2026-0001",
    "name": "Water Quality Sample A",
    "sampleType": "Water",
    "owner": "Dr. Asha Mehta",
    "project": "River Monitoring Study",
    "source": "Site 12",
    "notes": "Collected at north bank station.",
    "status": "Processing",
    "isDeleted": false,
    "createdAt": "2026-05-08T14:30:00Z",
    "updatedAt": "2026-05-09T09:15:00Z",
    "deletedAt": null,
    "version": 2,
    "lifecycleHistory": [
      {
        "status": "Pending",
        "changedBy": "lab.tech@labflow.internal",
        "changedAt": "2026-05-08T14:30:00Z",
        "comment": "Sample created."
      },
      {
        "status": "Processing",
        "changedBy": "lab.tech@labflow.internal",
        "changedAt": "2026-05-09T09:15:00Z",
        "comment": "Sample preparation started."
      }
    ]
  }
}
```

### Error Responses

| Status Code | When It Applies |
| --- | --- |
| `400 Bad Request` | Invalid path parameter format |
| `401 Unauthorized` | Caller is not authenticated |
| `403 Forbidden` | Caller is not allowed to view this sample |
| `404 Not Found` | No sample exists for the supplied `id` |
| `500 Internal Server Error` | Unexpected server error |

### 5.4 PUT `/samples/:id`

Updates mutable fields on an existing sample record.

For this MVP, `PUT` behaves as a practical update endpoint: omitted fields remain unchanged, and only mutable fields may be updated.

### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | System-generated sample record ID |

### Request Payload

```json
{
  "status": "Processing",
  "notes": "Sample preparation started.",
  "version": 1
}
```

### Mutable Fields

- `name`
- `sampleType`
- `owner`
- `project`
- `source`
- `notes`
- `status`

### Non-Mutable Fields

- `id`
- `sampleId`
- `createdAt`
- `deletedAt`
- `isDeleted`

### Validation Rules

- At least one mutable field must be supplied.
- `version` is required and must match the latest stored version.
- If `status` is provided, it must be one of `Pending`, `Processing`, or `Completed`.
- Allowed status transitions are:
  - `Pending` -> `Processing`
  - `Processing` -> `Completed`
- The following transitions are not allowed:
  - `Pending` -> `Completed`
  - `Processing` -> `Pending`
  - `Completed` -> `Pending`
  - `Completed` -> `Processing`
- `sampleId` cannot be changed after creation.
- A soft-deleted sample cannot be updated through this endpoint.

### Success Response

**Status Code:** `200 OK`

```json
{
  "data": {
    "id": "6a9c8d71-937e-4d0e-92e8-b0d24bf4d2c3",
    "sampleId": "SMP-2026-0001",
    "name": "Water Quality Sample A",
    "sampleType": "Water",
    "owner": "Dr. Asha Mehta",
    "project": "River Monitoring Study",
    "source": "Site 12",
    "notes": "Sample preparation started.",
    "status": "Processing",
    "isDeleted": false,
    "createdAt": "2026-05-08T14:30:00Z",
    "updatedAt": "2026-05-09T09:15:00Z",
    "deletedAt": null,
    "version": 2
  }
}
```

### Error Responses

| Status Code | When It Applies |
| --- | --- |
| `400 Bad Request` | Malformed JSON or invalid field types |
| `401 Unauthorized` | Caller is not authenticated |
| `403 Forbidden` | Caller is not allowed to update samples |
| `404 Not Found` | No sample exists for the supplied `id` |
| `409 Conflict` | Invalid status transition or stale `version` |
| `422 Unprocessable Entity` | Field-level validation failed |
| `500 Internal Server Error` | Unexpected server error |

### 5.5 DELETE `/samples/:id`

Soft deletes a sample record.

This endpoint does not permanently remove the record. Instead, it marks the sample as deleted and removes it from default active views.

### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | System-generated sample record ID |

### Request Payload

No request body is required.

### Validation Rules

- `id` is required.
- The sample must exist.
- If the sample is already soft-deleted, the operation should be treated as idempotent and return the current deleted state.

### Success Response

**Status Code:** `200 OK`

```json
{
  "data": {
    "id": "6a9c8d71-937e-4d0e-92e8-b0d24bf4d2c3",
    "sampleId": "SMP-2026-0001",
    "isDeleted": true,
    "deletedAt": "2026-05-10T11:20:00Z",
    "message": "Sample archived successfully."
  }
}
```

### Error Responses

| Status Code | When It Applies |
| --- | --- |
| `400 Bad Request` | Invalid path parameter format |
| `401 Unauthorized` | Caller is not authenticated |
| `403 Forbidden` | Caller is not allowed to delete samples |
| `404 Not Found` | No sample exists for the supplied `id` |
| `500 Internal Server Error` | Unexpected server error |

## 6. Additional Notes

- List and detail responses should return a consistent current status for the same sample.
- A successful status update should append a lifecycle history entry and update the current status atomically.
- Soft-deleted samples should remain retrievable when the caller explicitly requests deleted records or fetches the record by `id`, subject to access rules.
- The API contract uses the simplified workflow lifecycle documented in the business workflow specification: `Pending` -> `Processing` -> `Completed`.
