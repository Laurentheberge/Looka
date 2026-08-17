# LOOKA - DATABASE DOCUMENTATION

**Version:** 1.1  
**Date:** August 17, 2026  
**Status:** Draft  
**Database:** Firebase Firestore (NoSQL)

---

## Overview

This document defines the Firestore collections, security rules, and data structure for Looka.

---

## Collections

### users

```javascript
// Collection: users
// Document ID: userId (from Firebase Auth)

{
  email: "user@example.com",
  name: "John Doe",
  avatarUrl: "https://...",           // optional
  authProvider: "email",              // email | google | apple
  role: "student",                    // student | admin
  subscriptionStatus: "free",         // free | active | cancelled
  subscriptionExpiresAt: Timestamp,   // null if free
  dailyAiMessages: 0,
  dailySummaries: 0,
  dailyPracticeSessions: 0,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastLoginAt: Timestamp
}
```

---

### projects

```javascript
// Collection: projects
// Document ID: auto-generated

{
  userId: "userId",
  name: "GCE Mathematics",
  examType: "gce",                    // gce | bac | other
  subject: "Mathematics",
  createdAt: Timestamp,
  updatedAt: Timestamp,
  lastAccessedAt: Timestamp
}
```

---

### chatConversations

```javascript
// Collection: chatConversations
// Document ID: auto-generated

{
  projectId: "projectId",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

### chatMessages

```javascript
// Collection: chatMessages
// Document ID: auto-generated

{
  conversationId: "conversationId",
  role: "user",                       // user | assistant
  content: "Explain quadratic equations",
  createdAt: Timestamp
}
```

---

### pastQuestions

```javascript
// Collection: pastQuestions
// Document ID: auto-generated

{
  examType: "gce",                    // gce | bac | other
  subject: "Mathematics",
  year: 2024,
  questionText: "Solve x² + 5x + 6 = 0",
  options: ["x = -2, x = -3", "x = 2, x = 3", "x = -2, x = 3", "x = 2, x = -3"],
  correctAnswer: "x = -2, x = -3",
  explanation: "Factor the equation...",
  topics: ["algebra", "quadratic equations"],
  createdAt: Timestamp
}
```

---

### bookmarkedQuestions

```javascript
// Collection: bookmarkedQuestions
// Document ID: auto-generated

{
  userId: "userId",
  questionId: "questionId",
  createdAt: Timestamp
}
```

---

### uploadedNotes

```javascript
// Collection: uploadedNotes
// Document ID: auto-generated

{
  projectId: "projectId",
  fileName: "chapter1.pdf",
  fileUrl: "https://storage.googleapis.com/...",
  fileType: "pdf",                    // pdf | jpg | png | docx
  fileSize: 1024000,                  // bytes
  summary: "This chapter covers...",  // null until processed
  createdAt: Timestamp
}
```

---

### studyPlans

```javascript
// Collection: studyPlans
// Document ID: auto-generated

{
  projectId: "projectId",
  examDate: Timestamp,
  topics: ["Algebra", "Geometry", "Statistics"],
  dailySchedule: [
    {
      date: "2026-11-24",
      topic: "Algebra",
      tasks: ["Review quadratic equations", "Practice problems"]
    }
  ],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

### studyPlanTasks

```javascript
// Collection: studyPlanTasks
// Document ID: auto-generated

{
  studyPlanId: "planId",
  date: Timestamp,
  topic: "Algebra",
  completed: false,
  completedAt: null                   // set when completed
}
```

---

### practiceSessions

```javascript
// Collection: practiceSessions
// Document ID: auto-generated

{
  projectId: "projectId",
  userId: "userId",
  mode: "mcq",                        // flashcards | mcq
  questions: ["questionId1", "questionId2"],
  results: {
    "questionId1": { "correct": true, "correctAnswer": "x = -2, x = -3" },
    "questionId2": { "correct": false, "correctAnswer": "x = -2, x = -3" }
  },
  score: 50.0,
  createdAt: Timestamp
}
```

---

### subscriptions

```javascript
// Collection: subscriptions
// Document ID: auto-generated

{
  userId: "userId",
  status: "active",                   // active | cancelled | expired
  plan: "monthly",
  amount: 5000,                       // XAF
  paymentMethod: "mobile_money",
  paymentReference: "txn_uuid",
  startsAt: Timestamp,
  expiresAt: Timestamp,
  createdAt: Timestamp
}
```

---

## Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users
    match /users/{userId} {
      allow read, update: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Projects
    match /projects/{projectId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Chat Conversations
    match /chatConversations/{conversationId} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/projects/$(resource.data.projectId)).data.userId == request.auth.uid;
    }

    // Chat Messages
    match /chatMessages/{messageId} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/projects/$(get(/databases/$(database)/documents/chatConversations/$(resource.data.conversationId)).data.projectId)).data.userId == request.auth.uid;
    }

    // Past Questions (public read, admin write)
    match /pastQuestions/{questionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Bookmarked Questions
    match /bookmarkedQuestions/{bookmarkId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    // Uploaded Notes
    match /uploadedNotes/{noteId} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/projects/$(resource.data.projectId)).data.userId == request.auth.uid;
    }

    // Study Plans
    match /studyPlans/{planId} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/projects/$(resource.data.projectId)).data.userId == request.auth.uid;
    }

    // Study Plan Tasks
    match /studyPlanTasks/{taskId} {
      allow read, write: if request.auth != null &&
        get(/databases/$(database)/documents/projects/$(get(/databases/$(database)/documents/studyPlans/$(resource.data.studyPlanId)).data.projectId)).data.userId == request.auth.uid;
    }

    // Practice Sessions
    match /practiceSessions/{sessionId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    // Subscriptions
    match /subscriptions/{subscriptionId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## Firestore Indexes

Create these composite indexes in Firebase Console:

| Collection | Fields | Purpose |
|------------|--------|---------|
| projects | userId ASC, lastAccessedAt DESC | User's projects sorted |
| projects | examType ASC, subject ASC | Filter by exam/subject |
| pastQuestions | examType ASC, subject ASC, year DESC | Browse questions |
| pastQuestions | topics ARRAY | Topic filtering |
| chatMessages | conversationId ASC, createdAt ASC | Conversation history |
| uploadedNotes | projectId ASC | Project notes |
| studyPlans | projectId ASC | Project plans |
| studyPlanTasks | studyPlanId ASC, date ASC | Daily tasks |
| practiceSessions | userId ASC, createdAt DESC | User history |
| subscriptions | userId ASC | User subscriptions |
| subscriptions | expiresAt ASC | Expiry checks |
| bookmarkedQuestions | userId ASC | User bookmarks |

---

## Data Lifecycle

| Event | Action |
|-------|--------|
| User signup | Create user document |
| User creates project | Create project document |
| User chats | Create conversation + messages |
| User uploads note | Create note document, store file |
| User creates study plan | Create plan + task documents |
| User practices | Create session document |
| Daily reset | Update user counters |
| Subscription activates | Create subscription, update user |
| Subscription expires | Update subscription + user status |

---

*Project Foundation System v1.0*
*Created by No1Vibecoder*
