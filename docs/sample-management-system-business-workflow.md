# Business Workflow Documentation

## LabFlow Sample Management System

**Document Status:** Draft  
**Document Type:** Business Workflow Specification  
**Primary Users:** Lab Technicians, Scientists  
**Lifecycle Model:** `Pending` -> `Processing` -> `Completed`

## 1. Purpose

This document defines the business workflow for managing scientific samples in the LabFlow Sample Management System. It describes how a sample moves through its operational lifecycle, what validations apply at each stage, which status transitions are allowed, and what business rules and data consistency expectations must be enforced.

The workflow is designed to provide a simple, traceable, and operationally reliable sample lifecycle for internal laboratory use.

## 2. Workflow Overview

The sample lifecycle consists of three business statuses:

- `Pending`: The sample has been registered and is awaiting active work.
- `Processing`: The sample is currently being handled, tested, prepared, or analyzed.
- `Completed`: All required processing work has finished and the sample no longer requires active workflow action.

### Workflow Objective

The workflow ensures that:

- Every sample has a clear and current operational state
- Samples move through a controlled and predictable lifecycle
- Users understand when work can begin, continue, or end
- The system maintains accurate history and prevents inconsistent state changes

## 3. Workflow Steps

### 3.1 Sample Registration

**Starting Status:** `Pending`

When a new sample is created, it enters the system in the `Pending` state. This means the sample is known to the laboratory and recorded in the application, but active processing has not started.

Typical activities:

- Create a new sample record
- Enter required metadata
- Assign sample ownership or requestor
- Save the sample into the system

Expected outcome:

- The sample is visible in the sample list
- The sample has a unique identifier
- The sample is ready to move into `Processing` when work begins

### 3.2 Active Processing

**Transition:** `Pending` -> `Processing`

When laboratory work begins, the sample moves to `Processing`. This indicates that the sample is actively being worked on by the laboratory team.

Typical activities:

- Receive the sample for active work
- Perform preparation, testing, or analysis tasks
- Update the record to reflect in-progress activity

Expected outcome:

- The sample is clearly marked as in active work
- Users can identify the sample as operationally in progress
- Lifecycle history reflects who started processing and when

### 3.3 Workflow Completion

**Transition:** `Processing` -> `Completed`

When all required work for the sample is finished, the sample moves to `Completed`. This indicates that no further routine processing action is expected within the standard workflow.

Typical activities:

- Confirm that required processing steps are finished
- Record any final notes or completion comments
- Mark the sample as completed

Expected outcome:

- The sample is no longer treated as active work
- Users can distinguish completed samples from pending and in-progress samples
- Lifecycle history captures the completion event

## 4. Validations

The system must enforce the following validations to support a reliable business workflow.

### 4.1 Creation Validations

- A sample must have a unique sample identifier before it can be saved.
- Required metadata must be present before creation is completed.
- Required fields should include sample name or title, sample type, owner or requestor, and creation timestamp.
- The initial status must be `Pending`.
- The system must reject duplicate identifiers.

### 4.2 Transition Validations

- A sample may enter `Processing` only if it currently exists in `Pending`.
- A sample may enter `Completed` only if it currently exists in `Processing`.
- The system must reject any transition that skips required workflow stages.
- The system must reject transitions for records that are soft-deleted or archived from active workflows.
- Every accepted transition must record the acting user and timestamp.

### 4.3 Completion Validations

- A sample cannot be marked `Completed` if required processing has not been started.
- Completion should require any mandatory operational notes or result references defined by the lab process.
- Once completed, the record must remain viewable for traceability.

## 5. Allowed Transitions

### 5.1 Standard Transition Model

| Current Status | Allowed Next Status | Allowed |
| -------------- | ------------------- | ------- |
| New record     | `Pending`           | Yes     |
| `Pending`      | `Processing`        | Yes     |
| `Pending`      | `Completed`         | No      |
| `Processing`   | `Completed`         | Yes     |
| `Processing`   | `Pending`           | No      |
| `Completed`    | `Pending`           | No      |
| `Completed`    | `Processing`        | No      |

### 5.2 Transition Rules

- New samples must begin in `Pending`.
- Samples must move sequentially through the lifecycle.
- Backward transitions are not part of the normal workflow.
- Reopening a completed sample is not allowed through standard user actions and should require a controlled exception process if supported in the future.
- Direct completion from `Pending` is not allowed because work must first be explicitly started.

## 6. Business Rules

- A sample must have one and only one current lifecycle status at any time.
- A sample identifier must remain immutable after record creation unless corrected through a controlled administrative process.
- Status definitions must be standardized and used consistently across the system.
- All status changes must be captured in lifecycle history.
- Users must be able to view the current status and prior transitions of a sample.
- Completed samples remain part of the system record and must not be treated as deleted.
- Soft deletion or archival is separate from workflow completion and must not erase historical status data.
- The system must prevent users from creating multiple active interpretations of the same sample state.

## 7. Data Consistency Expectations

The workflow depends on strong consistency for key business data.

- Every sample record must maintain a single source of truth for current status.
- The current status and lifecycle history must never contradict each other.
- Status updates must be atomic so that the current status and history entry are saved together.
- Timestamps must be recorded consistently for sample creation and each status change.
- User attribution must be preserved for all material workflow actions.
- Soft-deleted or archived samples must retain their metadata and lifecycle history.
- Duplicate active records for the same physical sample must be prevented.
- Sample list views and detail views must show the same current status for the same record.

## 8. Edge Cases

### 8.1 Duplicate Sample Creation Attempt

If a user attempts to create a sample using an existing sample identifier, the system must reject the request and prompt the user to correct the identifier.

### 8.2 Incomplete Sample Data

If required metadata is missing during sample creation, the system must prevent record creation and clearly indicate which fields require correction.

### 8.3 Invalid Transition Attempt

If a user tries to move a sample directly from `Pending` to `Completed`, or backward from `Processing` to `Pending`, the system must reject the action and preserve the current valid state.

### 8.4 Concurrent Updates

If two users attempt to update the same sample at nearly the same time, the system must avoid overwriting a more recent valid update without detection. The final stored state must remain internally consistent and traceable.

### 8.5 Completed Sample Needs Rework

If a completed sample requires additional work, the standard workflow does not allow reopening through normal user actions. This case should be handled through a controlled exception process or future enhancement rather than an unrestricted backward transition.

### 8.6 Soft-Deleted or Archived Sample

If a sample has been removed from active workflows through soft deletion or archival, it must not continue through normal lifecycle transitions unless first restored through an authorized recovery process.

### 8.7 Processing Started Without Proper Registration

If users attempt to begin work on a sample that has not been fully registered, the system must require completion of mandatory sample data before allowing transition to `Processing`.

## 9. Operational Summary

The Sample Management System workflow is intentionally simple: samples are created as `Pending`, moved to `Processing` when active work begins, and marked `Completed` when work ends. The business value of this workflow comes from consistent validations, controlled transitions, strong auditability, and data integrity across every sample record.
