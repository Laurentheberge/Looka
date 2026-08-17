# LOOKA - API DOCUMENTATION

**Version:** 1.0  
**Date:** August 17, 2026  
**Status:** Draft

---

## Overview

This document defines the API routes for Looka, including endpoints, request/response formats, authentication, and error handling.

**Base URL:** `/api`  
**Authentication:** JWT (httpOnly cookie)  
**Content-Type:** `application/json`

---

## Authentication Routes

### POST /api/auth/signup

Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2026-08-17T10:00:00Z"
  }
}
```

**Errors:**
- 400: Invalid input
- 409: Email already exists

---

### POST /api/auth/login

Authenticate user and create session.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "student",
    "subscription_status": "free"
  }
}
```

**Errors:**
- 401: Invalid credentials
- 429: Too many attempts (rate limited)

---

### POST /api/auth/logout

Destroy user session.

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### POST /api/auth/callback

OAuth callback handler.

**Query Parameters:**
- `provider`: google | apple
- `code`: Authorization code

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

---

### POST /api/auth/reset-password

Send password reset email.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Reset email sent"
}
```

---

### POST /api/auth/verify-email

Verify email address.

**Request:**
```json
{
  "token": "verification_token"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Email verified"
}
```

---

## Project Routes

### GET /api/projects

List user's projects.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "GCE Mathematics",
      "exam_type": "gce",
      "subject": "Mathematics",
      "created_at": "2026-08-17T10:00:00Z",
      "last_accessed_at": "2026-08-17T10:00:00Z"
    }
  ]
}
```

---

### POST /api/projects

Create a new project.

**Request:**
```json
{
  "name": "GCE Mathematics",
  "exam_type": "gce",
  "subject": "Mathematics"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "GCE Mathematics",
    "exam_type": "gce",
    "subject": "Mathematics",
    "created_at": "2026-08-17T10:00:00Z"
  }
}
```

**Errors:**
- 400: Invalid input
- 403: Project limit reached (free tier)

---

### GET /api/projects/:id

Get project details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "GCE Mathematics",
    "exam_type": "gce",
    "subject": "Mathematics",
    "created_at": "2026-08-17T10:00:00Z",
    "last_accessed_at": "2026-08-17T10:00:00Z"
  }
}
```

**Errors:**
- 404: Project not found

---

### PUT /api/projects/:id

Update project.

**Request:**
```json
{
  "name": "GCE Advanced Mathematics"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "GCE Advanced Mathematics",
    "exam_type": "gce",
    "subject": "Mathematics"
  }
}
```

---

### DELETE /api/projects/:id

Delete project and all associated data.

**Response (200):**
```json
{
  "success": true,
  "message": "Project deleted"
}
```

**Errors:**
- 403: Cannot delete only project (free tier)

---

## Chat Routes

### GET /api/chat/:projectId/conversations

List conversations for a project.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "created_at": "2026-08-17T10:00:00Z",
      "updated_at": "2026-08-17T10:00:00Z"
    }
  ]
}
```

---

### POST /api/chat/:projectId/conversations

Create a new conversation.

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "created_at": "2026-08-17T10:00:00Z"
  }
}
```

---

### GET /api/chat/conversations/:id/messages

Get messages in a conversation.

**Query Parameters:**
- `limit`: Number of messages (default: 50)
- `offset`: Offset for pagination

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "role": "user",
      "content": "Explain quadratic equations",
      "created_at": "2026-08-17T10:00:00Z"
    },
    {
      "id": "uuid",
      "role": "assistant",
      "content": "Quadratic equations are...",
      "created_at": "2026-08-17T10:00:01Z"
    }
  ]
}
```

---

### POST /api/chat/conversations/:id/messages

Send a message and get AI response.

**Request:**
```json
{
  "content": "Explain quadratic equations"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "role": "assistant",
    "content": "Quadratic equations are...",
    "created_at": "2026-08-17T10:00:01Z"
  }
}
```

**Errors:**
- 429: Daily limit reached

---

## Questions Routes

### GET /api/questions

List past questions with filters.

**Query Parameters:**
- `exam_type`: gce | bac | other
- `subject`: Subject name
- `year`: Year number
- `search`: Search query
- `limit`: Number of questions (default: 20)
- `offset`: Offset for pagination

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "exam_type": "gce",
      "subject": "Mathematics",
      "year": 2024,
      "question_text": "Solve x² + 5x + 6 = 0",
      "options": ["x = -2, x = -3", "x = 2, x = 3", "x = -2, x = 3", "x = 2, x = -3"],
      "topics": ["algebra", "quadratic equations"]
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0
  }
}
```

---

### GET /api/questions/:id

Get a single question.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "exam_type": "gce",
    "subject": "Mathematics",
    "year": 2024,
    "question_text": "Solve x² + 5x + 6 = 0",
    "options": ["x = -2, x = -3", "x = 2, x = 3", "x = -2, x = 3", "x = 2, x = -3"],
    "correct_answer": "x = -2, x = -3",
    "explanation": "Factor the equation...",
    "topics": ["algebra", "quadratic equations"]
  }
}
```

---

### POST /api/questions/bookmark

Bookmark a question.

**Request:**
```json
{
  "question_id": "uuid"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "question_id": "uuid",
    "created_at": "2026-08-17T10:00:00Z"
  }
}
```

---

### DELETE /api/questions/bookmark/:id

Remove a bookmark.

**Response (200):**
```json
{
  "success": true,
  "message": "Bookmark removed"
}
```

---

### GET /api/questions/bookmarks

List user's bookmarked questions.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "question_id": "uuid",
      "question": {
        "question_text": "Solve x² + 5x + 6 = 0",
        "subject": "Mathematics"
      },
      "created_at": "2026-08-17T10:00:00Z"
    }
  ]
}
```

---

## Notes Routes

### POST /api/notes/upload

Upload a note file.

**Request:** `multipart/form-data`
- `file`: File (PDF, JPG, PNG, DOCX)
- `project_id`: Project UUID

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "file_name": "chapter1.pdf",
    "file_url": "https://storage.supabase.co/...",
    "file_type": "pdf",
    "file_size": 1024000,
    "created_at": "2026-08-17T10:00:00Z"
  }
}
```

**Errors:**
- 400: Invalid file type
- 413: File too large
- 429: Limit reached (free tier)

---

### GET /api/notes/:projectId

List notes for a project.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "file_name": "chapter1.pdf",
      "file_type": "pdf",
      "file_size": 1024000,
      "summary": "This chapter covers...",
      "created_at": "2026-08-17T10:00:00Z"
    }
  ]
}
```

---

### GET /api/notes/:id

Get a single note with summary.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "file_name": "chapter1.pdf",
    "file_url": "https://storage.supabase.co/...",
    "file_type": "pdf",
    "summary": "This chapter covers...",
    "created_at": "2026-08-17T10:00:00Z"
  }
}
```

---

### DELETE /api/notes/:id

Delete a note.

**Response (200):**
```json
{
  "success": true,
  "message": "Note deleted"
}
```

---

## Planner Routes

### POST /api/planner/:projectId

Create a study plan.

**Request:**
```json
{
  "exam_date": "2026-12-01",
  "topics": ["Algebra", "Geometry", "Statistics"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "exam_date": "2026-12-01",
    "topics": ["Algebra", "Geometry", "Statistics"],
    "daily_schedule": [
      {
        "date": "2026-11-24",
        "topic": "Algebra",
        "tasks": ["Review quadratic equations", "Practice problems"]
      }
    ],
    "created_at": "2026-08-17T10:00:00Z"
  }
}
```

**Errors:**
- 400: Exam date too soon (min 7 days)
- 403: Study planner requires subscription

---

### GET /api/planner/:projectId

Get study plan for a project.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "exam_date": "2026-12-01",
    "topics": ["Algebra", "Geometry", "Statistics"],
    "daily_schedule": [...],
    "created_at": "2026-08-17T10:00:00Z"
  }
}
```

---

### PUT /api/planner/:id

Update study plan.

**Request:**
```json
{
  "exam_date": "2026-12-15"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "exam_date": "2026-12-15",
    "daily_schedule": [...]
  }
}
```

---

### DELETE /api/planner/:id

Delete study plan.

**Response (200):**
```json
{
  "success": true,
  "message": "Study plan deleted"
}
```

---

### PUT /api/planner/tasks/:id

Update task completion status.

**Request:**
```json
{
  "completed": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "completed": true,
    "completed_at": "2026-08-17T10:00:00Z"
  }
}
```

---

## Practice Routes

### POST /api/practice/start

Start a practice session.

**Request:**
```json
{
  "project_id": "uuid",
  "mode": "mcq",
  "question_ids": ["uuid1", "uuid2", "uuid3"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "mode": "mcq",
    "questions": [
      {
        "id": "uuid",
        "question_text": "Solve x² + 5x + 6 = 0",
        "options": ["x = -2, x = -3", "x = 2, x = 3"]
      }
    ]
  }
}
```

**Errors:**
- 429: Daily limit reached (free tier)

---

### PUT /api/practice/:id

Update practice session with answers.

**Request:**
```json
{
  "answers": {
    "uuid1": "x = -2, x = -3",
    "uuid2": "x = 2, x = 3"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "results": {
      "uuid1": { "correct": true, "correct_answer": "x = -2, x = -3" },
      "uuid2": { "correct": false, "correct_answer": "x = -2, x = -3" }
    },
    "score": 50.0
  }
}
```

---

### GET /api/practice/history

Get user's practice history.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "mode": "mcq",
      "score": 80.0,
      "created_at": "2026-08-17T10:00:00Z"
    }
  ]
}
```

---

## Payment Routes

### POST /api/payment/subscribe

Create a subscription.

**Request:**
```json
{
  "plan": "monthly",
  "payment_method": "mobile_money",
  "phone_number": "+237XXXXXXXXX"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "pending",
    "payment_url": "https://payamgo.com/pay/..."
  }
}
```

**Errors:**
- 400: Invalid payment method
- 402: Payment failed

---

### POST /api/payment/webhook

Payamgo webhook handler.

**Request:** (from Payamgo)
```json
{
  "event": "payment.success",
  "data": {
    "reference": "txn_uuid",
    "amount": 5000,
    "status": "success"
  }
}
```

**Response (200):**
```json
{
  "success": true
}
```

---

### GET /api/payment/subscription

Get user's subscription status.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "active",
    "plan": "monthly",
    "expires_at": "2026-09-17T10:00:00Z"
  }
}
```

---

### POST /api/payment/cancel

Cancel subscription.

**Response (200):**
```json
{
  "success": true,
  "message": "Subscription cancelled. Access until 2026-09-17."
}
```

---

## Admin Routes

### GET /api/admin/users

List all users.

**Query Parameters:**
- `limit`: Number of users (default: 20)
- `offset`: Offset for pagination
- `search`: Search by email or name

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "student",
      "subscription_status": "active",
      "created_at": "2026-08-17T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 1000,
    "limit": 20,
    "offset": 0
  }
}
```

---

### GET /api/admin/projects

List all projects.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "GCE Mathematics",
      "user_email": "user@example.com",
      "exam_type": "gce",
      "created_at": "2026-08-17T10:00:00Z"
    }
  ]
}
```

---

### GET /api/admin/analytics

Get platform analytics.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "total_users": 1000,
    "active_subscriptions": 50,
    "total_projects": 500,
    "total_messages": 10000,
    "total_notes": 2000
  }
}
```

---

### PUT /api/admin/users/:id

Update a user.

**Request:**
```json
{
  "role": "admin"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "role": "admin"
  }
}
```

---

### DELETE /api/admin/users/:id

Delete a user.

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted"
}
```

---

## Error Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| VALIDATION_ERROR | Invalid input |
| UNAUTHORIZED | Not authenticated |
| FORBIDDEN | Not authorized |
| NOT_FOUND | Resource not found |
| RATE_LIMITED | Too many requests |
| CONFLICT | Resource already exists |
| PAYMENT_FAILED | Payment processing error |
| AI_UNAVAILABLE | AI service unavailable |
| FILE_TOO_LARGE | Upload exceeds limit |
| INVALID_FILE_TYPE | Unsupported file format |

---

## Rate Limits

| Route | Limit | Window |
|-------|-------|--------|
| POST /api/auth/* | 10 | 1 minute |
| POST /api/chat/*/messages | 100 | 1 day |
| POST /api/notes/upload | 10 | 1 hour |
| POST /api/practice/start | 24 | 1 day |
| All other routes | 100 | 1 minute |

---

*Project Foundation System v1.0*
*Created by No1Vibecoder*
