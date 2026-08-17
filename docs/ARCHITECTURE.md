# LOOKA - ARCHITECTURE DOCUMENT

**Version:** 1.0  
**Date:** August 17, 2026  
**Status:** Draft

---

## 1. STACK DECISION

### Frontend Framework: Next.js 14 (App Router)

**Why:**
- React-based with server components for better performance
- Built-in routing for marketing site and web app
- Server-side rendering (SSR) for SEO on landing pages
- API routes eliminate need for separate backend
- Excellent mobile responsiveness
- Large community and documentation

### Language: TypeScript

**Why:**
- Type safety prevents runtime errors
- Better IDE support and autocomplete
- Easier refactoring and maintenance
- Industry standard for React projects

### Backend: Next.js API Routes + Firebase

**Why:**
- No separate backend server needed
- API routes handle custom logic
- Firebase provides database, auth, storage, and real-time
- Reduces complexity and deployment overhead

### Database: Firebase (Firestore)

**Why:**
- NoSQL document database - flexible schema
- Real-time data synchronization
- Built-in offline support
- Easy to scale
- Good JavaScript/TypeScript SDK
- Free tier for development
- Google-backed reliability

### Authentication: Firebase Auth

**Why:**
- Built-in email/password authentication
- Google OAuth support
- Apple Sign-In support
- JWT tokens handled automatically
- Easy integration with Firestore
- No additional service needed

### Styling: Tailwind CSS

**Why:**
- Utility-first approach for rapid development
- Consistent design system
- Mobile-first responsive design
- Dark mode support built-in
- Small production bundle

### Component System: shadcn/ui

**Why:**
- High-quality, accessible components
- Built on Radix UI primitives
- Customizable with Tailwind CSS
- No runtime dependency
- Follows best practices

### State Management: React Hooks + Zustand

**Why:**
- React hooks for local state
- Zustand for global state (if needed)
- Simple and lightweight
- No boilerplate

### File Storage: Firebase Storage

**Why:**
- Integrated with Firebase
- Built-in CDN
- Access control via security rules
- No additional service needed

### Hosting: Vercel (Initial) → Sitebunker (Production)

**Vercel (Development/Launch):**
- Optimized for Next.js
- Automatic deployments from Git
- Built-in SSL and CDN
- Free tier for development
- Fast setup for MVP

**Sitebunker (Production Migration):**
- Better performance for African users
- Local hosting in Cameroon/Africa
- More control over infrastructure
- Better pricing at scale
- Migration after MVP validation

### AI Integration: Google Gemini API

**Why:**
- Can read and analyze images (notes summarizer)
- Multimodal capabilities (text + vision)
- Good documentation
- Free tier available
- Google-backed reliability

### Payment: Payamgo (Initial) → Better Gateway (Production)

**Payamgo (Development/Launch):**
- Mobile Money support in Cameroon
- API available for integration
- Quick setup for MVP
- Transaction fees reasonable

**Production Migration:**
- Better pricing at scale
- More payment methods
- Better documentation
- Migration after validation

### Testing: Vitest + Playwright

**Why:**
- Vitest for unit tests (fast, Vite-native)
- Playwright for end-to-end tests
- Good coverage options
- Easy to set up

### Monitoring: Vercel Analytics + Sentry

**Why:**
- Vercel Analytics for performance
- Sentry for error tracking
- Both have free tiers
- Easy integration

---

## 2. ARCHITECTURE

### Application Boundaries

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  Next.js App                         │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │   │
│  │  │ Marketing   │  │   Web App   │  │   Admin     │ │   │
│  │  │   Site      │  │  (Dashboard)│  │  Dashboard  │ │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API LAYER                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Next.js API Routes                      │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐ │   │
│  │  │  Auth   │  │Projects │  │   AI    │  │Payment │ │   │
│  │  │ Routes  │  │ Routes  │  │ Routes  │  │ Routes │ │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └────────┘ │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────────┐ │   │
│  │ Firebase│  │Gemini │  │Payamgo │  │  SendGrid   │ │   │
│  │ (Auth,  │  │  (AI)   │  │ (Payment)│  │  (Email)    │ │   │
│  │Firestore│  │         │  │          │  │             │ │   │
│  │Storage) │  │         │  │          │  │             │ │   │
│  └─────────┘  └─────────┘  └─────────┘  └──────────────┘ │   │
└─────────────────────────────────────────────────────────────┘
```

### Frontend/Backend Relationship

**Frontend (Next.js):**
- Marketing site pages (public)
- Web app pages (authenticated)
- Admin pages (admin role)
- Client-side interactivity

**Backend (API Routes):**
- Authentication endpoints
- Project CRUD operations
- AI chat proxy
- Payment processing
- File upload handling

**Firebase (Services):**
- Database operations
- Authentication management
- File storage
- Security rules

### Data Flow

#### User Authentication Flow
```
User → Login Page → Firebase Auth → JWT Token → Session
                                                    ↓
                                              Dashboard
```

#### AI Chat Flow
```
User → Chat Input → API Route → Google Gemini API → Response → Display
                              ↓
                        Rate Limit Check
                        Context Building
                        Message Storage
```

#### Payment Flow
```
User → Subscribe → API Route → Payamgo → Webhook → Update Subscription
                                ↓
                          Payment Confirmation
                          Subscription Update
                          Email Receipt
```

#### File Upload Flow
```
User → Upload File → API Route → Firebase Storage → File URL → Firestore
                                      ↓
                                AI Processing
                                Summary Generation
                                Save to Database
```

### Authentication Flow

```
1. User enters credentials OR clicks OAuth button
2. Firebase Auth validates credentials
3. JWT token returned to client
4. Token stored in secure cookie
5. Subsequent requests include token
6. API routes verify token
7. Security rules enforce permissions
```

### API Boundaries

**Public Routes (No Auth):**
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/callback`

**Protected Routes (Auth Required):**
- `/api/projects/*`
- `/api/chat/*`
- `/api/questions/*`
- `/api/notes/*`
- `/api/planner/*`
- `/api/practice/*`

**Admin Routes (Admin Role):**
- `/api/admin/*`

### External Services

| Service | Purpose | Data Flow |
|---------|---------|-----------|
| Firebase | Database, Auth, Storage | Bidirectional |
| Google Gemini | AI Chat, Summarization | Request/Response |
| Payamgo | Payment Processing (initial) | Request/Webhook |
| SendGrid | Email Delivery | One-way |
| Vercel | Hosting (initial) | Hosting |
| Sitebunker | Hosting (production) | Hosting |

### Security Boundaries

```
┌─────────────────────────────────────────────┐
│              CLIENT (Browser)               │
│  - User input                               │
│  - UI state                                 │
│  - JWT token (httpOnly cookie)              │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│           API ROUTES (Server)               │
│  - Input validation                         │
│  - Authentication check                     │
│  - Authorization check                      │
│  - Rate limiting                            │
│  - Business logic                           │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│           FIREBASE (Services)               │
│  - Security rules                           │
│  - Authentication policies                  │
│  - Storage rules                            │
│  - Firestore rules                          │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│           EXTERNAL APIs                     │
│  - Google Gemini (AI)                       │
│  - Payamgo (Payment)                        │
│  - SendGrid (Email)                         │
└─────────────────────────────────────────────┘
```

---

## 3. PROJECT STRUCTURE

```
looka/
├── docs/                          # Documentation
│   ├── PROJECT_BRIEF.md
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   └── DESIGN_SYSTEM.md
│
├── public/                        # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (marketing)/           # Public routes group
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── features/
│   │   │   ├── pricing/
│   │   │   ├── about/
│   │   │   └── contact/
│   │   │
│   │   ├── (auth)/                # Auth routes group
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── forgot-password/
│   │   │
│   │   ├── (dashboard)/           # Protected routes group
│   │   │   ├── layout.tsx         # Dashboard layout
│   │   │   ├── page.tsx           # Dashboard home
│   │   │   ├── project/
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx   # Project home
│   │   │   │       ├── chat/
│   │   │   │       ├── questions/
│   │   │   │       ├── summarize/
│   │   │   │       ├── practice/
│   │   │   │       └── planner/
│   │   │   └── settings/
│   │   │       ├── profile/
│   │   │       ├── subscription/
│   │   │       └── notifications/
│   │   │
│   │   ├── (admin)/               # Admin routes group
│   │   │   ├── layout.tsx         # Admin layout
│   │   │   ├── page.tsx           # Admin dashboard
│   │   │   ├── users/
│   │   │   ├── projects/
│   │   │   └── analytics/
│   │   │
│   │   ├── api/                   # API routes
│   │   │   ├── auth/
│   │   │   ├── projects/
│   │   │   ├── chat/
│   │   │   ├── questions/
│   │   │   ├── notes/
│   │   │   ├── planner/
│   │   │   ├── practice/
│   │   │   ├── payment/
│   │   │   └── admin/
│   │   │
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Root page
│   │   └── globals.css            # Global styles
│   │
│   ├── components/                # Reusable components
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── layout/                # Layout components
│   │   ├── marketing/             # Marketing page components
│   │   ├── dashboard/             # Dashboard components
│   │   ├── project/               # Project page components
│   │   ├── chat/                  # AI chat components
│   │   ├── questions/             # Past questions components
│   │   ├── notes/                 # Notes summarizer components
│   │   ├── practice/              # Q&A practice components
│   │   ├── planner/               # Study planner components
│   │   └── shared/                # Shared components
│   │
│   ├── lib/                       # Utility libraries
│   │   ├── firebase/              # Firebase configuration
│   │   │   ├── config.ts          # Firebase app config
│   │   │   ├── auth.ts            # Firebase Auth helpers
│   │   │   ├── firestore.ts       # Firestore helpers
│   │   │   └── storage.ts         # Firebase Storage helpers
│   │   ├── ai/                    # AI integration
│   │   │   ├── gemini.ts          # Google Gemini client
│   │   │   ├── chat.ts            # Chat logic
│   │   │   └── summarize.ts       # Summarization logic
│   │   ├── payment/               # Payment integration
│   │   │   └── payamgo.ts         # Payamgo client
│   │   ├── email/                 # Email service
│   │   │   └── sendgrid.ts        # SendGrid client
│   │   └── utils.ts               # General utilities
│   │
│   ├── hooks/                     # React hooks
│   │   ├── useAuth.ts
│   │   ├── useProject.ts
│   │   ├── useChat.ts
│   │   └── useSubscription.ts
│   │
│   ├── types/                     # TypeScript types
│   │   ├── database.ts            # Database types
│   │   ├── api.ts                 # API types
│   │   └── components.ts          # Component props types
│   │
│   └── middleware.ts               # Next.js middleware
│
├── prisma/                        # Database schema (if using Prisma)
│   └── schema.prisma
│
├── firebase/                      # Firebase configuration
│   ├── config.ts          # Firebase app config
│   ├── auth.ts            # Firebase Auth helpers
│   ├── firestore.ts       # Firestore helpers
│   └── storage.ts         # Firebase Storage helpers
│
├── tests/                         # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example                   # Environment variables template
├── .env.local                     # Local environment (gitignored)
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── README.md                      # Project documentation
```

---

## 4. DATABASE FOUNDATION

### Tables

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT,  -- NULL for OAuth users
  avatar_url TEXT,
  auth_provider TEXT NOT NULL DEFAULT 'email',  -- email/google/apple
  role TEXT NOT NULL DEFAULT 'student',  -- student/admin
  subscription_status TEXT NOT NULL DEFAULT 'free',  -- free/active/cancelled
  subscription_expires_at TIMESTAMPTZ,
  daily_ai_messages INTEGER DEFAULT 0,
  daily_summaries INTEGER DEFAULT 0,
  daily_practice_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- Index for auth
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 3 AND 50),
  exam_type TEXT NOT NULL,  -- gce/bac/other
  subject TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_accessed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user's projects
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_last_accessed ON projects(last_accessed_at DESC);
```

#### chat_conversations
```sql
CREATE TABLE chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_conversations_project ON chat_conversations(project_id);
```

#### chat_messages
```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,  -- user/assistant
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
```

#### past_questions
```sql
CREATE TABLE past_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_type TEXT NOT NULL,  -- gce/bac/other
  subject TEXT NOT NULL,
  year INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  options JSONB,  -- For MCQ
  correct_answer TEXT,
  explanation TEXT,
  topics TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_past_questions_exam_subject ON past_questions(exam_type, subject);
CREATE INDEX idx_past_questions_year ON past_questions(year);
CREATE INDEX idx_past_questions_topics ON past_questions USING GIN(topics);
```

#### bookmarked_questions
```sql
CREATE TABLE bookmarked_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES past_questions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

CREATE INDEX idx_bookmarked_user ON bookmarked_questions(user_id);
```

#### uploaded_notes
```sql
CREATE TABLE uploaded_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,  -- pdf/jpg/png/docx
  file_size INTEGER NOT NULL,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_uploaded_notes_project ON uploaded_notes(project_id);
```

#### study_plans
```sql
CREATE TABLE study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  exam_date DATE NOT NULL,
  topics JSONB NOT NULL,
  daily_schedule JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_study_plans_project ON study_plans(project_id);
```

#### study_plan_tasks
```sql
CREATE TABLE study_plan_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  study_plan_id UUID NOT NULL REFERENCES study_plans(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  topic TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_study_plan_tasks_plan ON study_plan_tasks(study_plan_id);
CREATE INDEX idx_study_plan_tasks_date ON study_plan_tasks(date);
```

#### practice_sessions
```sql
CREATE TABLE practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL,  -- flashcards/mcq
  questions JSONB NOT NULL,
  results JSONB NOT NULL,
  score FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_practice_sessions_user ON practice_sessions(user_id);
CREATE INDEX idx_practice_sessions_project ON practice_sessions(project_id);
```

#### subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status TEXT NOT NULL,  -- active/cancelled/expired
  plan TEXT NOT NULL,  -- monthly
  amount DECIMAL(10,2) NOT NULL,  -- In XAF
  payment_method TEXT NOT NULL,  -- mobile_money
  payment_reference TEXT NOT NULL,
  starts_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
```

### Relationships

```
users 1──N projects
users 1──N bookmarked_questions
users 1──N practice_sessions
users 1──N subscriptions

projects 1──N chat_conversations
projects 1──N uploaded_notes
projects 1──N study_plans
projects 1──N practice_sessions

chat_conversations 1──N chat_messages

past_questions 1──N bookmarked_questions

study_plans 1──N study_plan_tasks
```

### Row-Level Security Policies

```sql
-- Users can only read/update their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Projects: Users can only access their own
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for other tables...
```

### Data Lifecycle

| Event | Action |
|-------|--------|
| User signup | Create user record |
| User creates project | Create project, check limits |
| User uploads note | Create note record, store file |
| User chats | Create conversation/messages |
| Daily reset | Reset daily counters |
| Subscription expires | Update status, enforce limits |
| User deletes account | Soft delete, archive data |

---

## 5. API FOUNDATION

### Authentication Routes

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/callback
POST /api/auth/reset-password
POST /api/auth/verify-email
```

### Project Routes

```
GET    /api/projects              # List user's projects
POST   /api/projects              # Create project
GET    /api/projects/:id          # Get project
PUT    /api/projects/:id          # Update project
DELETE /api/projects/:id          # Delete project
```

### Chat Routes

```
GET    /api/chat/:projectId/conversations     # List conversations
POST   /api/chat/:projectId/conversations     # Create conversation
GET    /api/chat/conversations/:id/messages    # Get messages
POST   /api/chat/conversations/:id/messages    # Send message
```

### Questions Routes

```
GET    /api/questions                          # List questions (filtered)
GET    /api/questions/:id                      # Get question
POST   /api/questions/bookmark                 # Bookmark question
DELETE /api/questions/bookmark/:id             # Remove bookmark
GET    /api/questions/bookmarks                # List bookmarks
```

### Notes Routes

```
POST   /api/notes/upload                       # Upload note
GET    /api/notes/:projectId                   # List notes
GET    /api/notes/:id                          # Get note
DELETE /api/notes/:id                          # Delete note
```

### Planner Routes

```
POST   /api/planner/:projectId                 # Create study plan
GET    /api/planner/:projectId                 # Get study plan
PUT    /api/planner/:id                        # Update study plan
DELETE /api/planner/:id                        # Delete study plan
PUT    /api/planner/tasks/:id                  # Update task completion
```

### Practice Routes

```
POST   /api/practice/start                     # Start practice session
PUT    /api/practice/:id                       # Update session
GET    /api/practice/history                   # Get practice history
```

### Payment Routes

```
POST   /api/payment/subscribe                  # Create subscription
POST   /api/payment/webhook                    # Payamgo webhook
GET    /api/payment/subscription               # Get subscription status
POST   /api/payment/cancel                     # Cancel subscription
```

### Admin Routes

```
GET    /api/admin/users                        # List all users
GET    /api/admin/projects                     # List all projects
GET    /api/admin/analytics                    # Get analytics
PUT    /api/admin/users/:id                    # Update user
DELETE /api/admin/users/:id                    # Delete user
```

### Request/Response Examples

#### Create Project
```typescript
// Request
POST /api/projects
{
  "name": "GCE Mathematics",
  "exam_type": "gce",
  "subject": "Mathematics"
}

// Response
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

#### Send Chat Message
```typescript
// Request
POST /api/chat/conversations/:id/messages
{
  "content": "Explain quadratic equations"
}

// Response
{
  "success": true,
  "data": {
    "id": "uuid",
    "role": "assistant",
    "content": "Quadratic equations are...",
    "created_at": "2026-08-17T10:00:00Z"
  }
}
```

### Rate Limits

| Route | Limit | Window |
|-------|-------|--------|
| Auth routes | 10 requests | 1 minute |
| AI chat | 100 requests | 1 day (free) |
| File upload | 10 requests | 1 hour |
| General API | 100 requests | 1 minute |

### Error Responses

```typescript
// Standard error format
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Daily limit reached. Upgrade for unlimited access."
  }
}

// Validation error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": {
      "field": "name",
      "issue": "Must be between 3 and 50 characters"
    }
  }
}
```

---

## 6. DESIGN SYSTEM

### Color Tokens

```css
:root {
  /* Primary Colors */
  --color-paper: #F2ECDD;        /* Background (light sections) */
  --color-navy: #0F1B33;         /* Hero/Footer */
  --color-gold: #E8A33D;         /* Primary CTAs/Highlights */
  --color-green: #2F6E4F;        /* Success/Trust */
  --color-ink: #14213D;          /* Text on paper */

  /* Neutral Colors */
  --color-white: #FFFFFF;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;

  /* Semantic Colors */
  --color-error: #DC2626;
  --color-warning: #F59E0B;
  --color-success: #10B981;
  --color-info: #3B82F6;
}

.dark {
  --color-paper: #1A1A2E;
  --color-navy: #F2ECDD;
  --color-ink: #F2ECDD;
}
```

### Typography

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Spacing

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;     /* 4px */
  --space-2: 0.5rem;      /* 8px */
  --space-3: 0.75rem;     /* 12px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-8: 2rem;        /* 32px */
  --space-10: 2.5rem;     /* 40px */
  --space-12: 3rem;       /* 48px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
}
```

### Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-full: 9999px;
}
```

### Shadows

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

### Breakpoints

```css
/* Mobile first approach */
@media (min-width: 640px)  { /* sm: 640px - Tablet */ }
@media (min-width: 768px)  { /* md: 768px - Small desktop */ }
@media (min-width: 1024px) { /* lg: 1024px - Desktop */ }
@media (min-width: 1280px) { /* xl: 1280px - Large desktop */ }
```

### Component Styles

#### Buttons
```css
.btn-primary {
  background-color: var(--color-gold);
  color: var(--color-navy);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  transition: all 0.2s;
}

.btn-primary:hover {
  background-color: #D4922E;
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-navy);
  border: 2px solid var(--color-navy);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
}
```

#### Inputs
```css
.input {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(232, 163, 61, 0.1);
}
```

#### Cards
```css
.card {
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
}
```

### Icon System

- Library: Lucide Icons (consistent with shadcn/ui)
- Sizes: 16px (sm), 20px (md), 24px (lg)
- Weight: Stroke width 2 (default)

---

## 7. RESPONSIVE FOUNDATION

### Mobile (< 640px)
- Single column layout
- Collapsible navigation (hamburger menu)
- Full-width cards and buttons
- Touch-friendly targets (min 44px)
- Bottom navigation for main actions

### Tablet (640px - 1024px)
- Two column layout where appropriate
- Sidebar navigation (collapsible)
- Responsive grid
- Touch-friendly targets

### Desktop (> 1024px)
- Fixed sidebar navigation
- Multi-column layout
- Hover states
- Keyboard navigation

### Layout Components

```
Marketing Layout:
┌─────────────────────────────────────┐
│ Header (Logo, Nav, CTA)            │
├─────────────────────────────────────┤
│ Content                             │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘

Dashboard Layout:
┌─────────────────────────────────────┐
│ Sidebar │ Main Content              │
│ (Nav)   │                           │
│         │                           │
│         │                           │
└─────────────────────────────────────┘

Project Layout:
┌─────────────────────────────────────┐
│ Sidebar │ Tabs │ Content            │
│ (Nav)   │      │                    │
│         │      │                    │
└─────────────────────────────────────┘
```

---

## 8. AUTHENTICATION ARCHITECTURE

### Provider: Firebase Auth

### Session Strategy
- JWT tokens stored in httpOnly cookies
- Token refresh handled by Firebase
- Secure, SameSite=Lax

### Protected Routes
```
/marketing/*     - Public
/login           - Public (redirects if authenticated)
/signup          - Public (redirects if authenticated)
/dashboard/*     - Protected (requires auth)
/project/*       - Protected (requires auth)
/settings/*      - Protected (requires auth)
/admin/*         - Protected (requires admin role)
```

### Middleware
```typescript
// src/middleware.ts
export async function middleware(req: NextRequest) {
  const session = await getSession(req);
  
  // Protected routes
  if (isProtectedRoute(req.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  // Admin routes
  if (isAdminRoute(req.nextUrl.pathname) && session?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  // Auth routes (redirect if already logged in)
  if (isAuthRoute(req.nextUrl.pathname) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  return NextResponse.next();
}
```

### OAuth Callbacks
```
Google: /api/auth/callback?provider=google
Apple: /api/auth/callback?provider=apple
```

### Password Reset Flow
1. User clicks "Forgot password"
2. Enter email address
3. Firebase sends reset email
4. User clicks link (valid 1 hour)
5. Enter new password
6. Password updated
7. Redirect to login

### Email Verification Flow
1. User signs up with email
2. Firebase sends verification email
3. User clicks link
4. Email verified
5. Account activated

---

## 9. SECURITY FOUNDATION

### Secret Handling
- All secrets in environment variables
- Never commit .env files
- Use .env.example for templates
- Rotate secrets regularly

### Environment Variables
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_SERVICE_ACCOUNT_KEY=

# Google Gemini
GEMINI_API_KEY=

# Payamgo
PAYAMGO_API_KEY=
PAYAMGO_SECRET_KEY=

# SendGrid
SENDGRID_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

### Server/Client Boundaries
- API routes: Server-side (can access secrets)
- Components: Client-side (no secrets)
- Server components: Can access secrets
- Use NEXT_PUBLIC_ prefix for client-side variables

### Input Validation
- Validate all inputs on server
- Use Zod for schema validation
- Sanitize user input
- Prevent SQL injection (parameterized queries)
- Prevent XSS (escape output)

### Authorization
- Check authentication on all protected routes
- Check authorization for admin routes
- Row-level security in database
- Validate ownership before mutations

### Database Security
- Firebase Security Rules
- Users can only access their own data
- Admin can access all data
- Validate before write

### File Security
- Validate file types
- Limit file size (10MB)
- Scan for malware (if possible)
- Store outside web root
- Use signed URLs for access

### Payment Verification
- Verify webhook signatures
- Validate transaction amounts
- Check payment status
- Log all transactions

### Sensitive Data Handling
- Never log passwords or tokens
- Encrypt sensitive data at rest
- Use HTTPS for all communication
- Implement rate limiting
- Log security events

---

## 10. THIRD-PARTY SERVICES

### Firebase
| Aspect | Details |
|--------|---------|
| **Why** | Database, auth, storage in one |
| **Connects** | All data operations |
| **Credentials** | Firebase config, service account |
| **Production** | Upgrade to Blaze plan |
| **Failure** | Show error, retry |

### Google Gemini
| Aspect | Details |
|--------|---------|
| **Why** | AI chat, summarization, image analysis |
| **Connects** | Chat and notes features |
| **Credentials** | API key |
| **Production** | Set usage limits |
| **Failure** | Show "AI unavailable" |

### Payamgo
| Aspect | Details |
|--------|---------|
| **Why** | Mobile Money payments (initial) |
| **Connects** | Subscription feature |
| **Credentials** | API key, secret key |
| **Production** | Verify webhooks |
| **Failure** | Show "Payment failed" |
| **Migration** | Will change to better gateway when scaling |

### SendGrid
| Aspect | Details |
|--------|---------|
| **Why** | Transactional emails |
| **Connects** | Auth, receipts |
| **Credentials** | API key |
| **Production** | Verify sender domain |
| **Failure** | Queue for retry |

### Vercel
| Aspect | Details |
|--------|---------|
| **Why** | Hosting and deployment (initial) |
| **Connects** | Application |
| **Credentials** | GitHub integration |
| **Production** | Upgrade if needed |
| **Failure** | Auto-recovery |
| **Migration** | Will migrate to Sitebunker after MVP |

### Sitebunker
| Aspect | Details |
|--------|---------|
| **Why** | Production hosting (better Africa performance) |
| **Connects** | Application |
| **Credentials** | Sitebunker account |
| **Production** | After MVP validation |
| **Failure** | Standard hosting recovery |

---

## 11. ENVIRONMENT CONFIGURATION

### Development
```bash
# Local development
npm run dev

# Environment
.env.local
```

### Preview/Staging
```bash
# Vercel preview deployments
# Automatic on PR
```

### Production
```bash
# Vercel production
# Deploy on main branch
```

### Environment Variables Template (.env.example)
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
FIREBASE_SERVICE_ACCOUNT_KEY=your_service_account_key_json

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# Payamgo
PAYAMGO_API_KEY=your_payamgo_api_key
PAYAMGO_SECRET_KEY=your_payamgo_secret_key

# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 12. TESTING FOUNDATION

### Unit Testing
- Framework: Vitest
- Coverage: 80% target
- Focus: Utility functions, hooks

### Integration Testing
- Framework: Vitest
- Focus: API routes, database operations

### End-to-End Testing
- Framework: Playwright
- Focus: Critical user journeys
- Browsers: Chrome, Firefox, Safari

### Type Checking
- Tool: TypeScript
- Strict mode enabled
- Run: `npm run typecheck`

### Linting
- Tool: ESLint + Prettier
- Run: `npm run lint`

### Build Checks
- Run: `npm run build`
- Verify no errors

---

## 13. DEPLOYMENT FOUNDATION

### Hosting: Vercel (Initial) → Sitebunker (Production)

**Vercel (Development/Launch):**
- Automatic deployments from Git
- Preview deployments for PRs
- Production on main branch
- Free tier for development

**Sitebunker (Production Migration):**
- Better performance for African users
- Local hosting in Cameroon/Africa
- More control over infrastructure
- Migration after MVP validation

### Database: Firebase (Firestore)
- Managed NoSQL database
- Automatic scaling
- Real-time sync
- No database administration

### Domain
- Primary: looka.cm (or similar)
- App: app.looka.cm
- Admin: admin.looka.cm

### SSL
- Automatic via Vercel
- Enforce HTTPS

### CI/CD
- GitHub Actions
- Run tests on PR
- Lint and typecheck
- Build verification

### Rollback
- Vercel: Instant rollback to previous deployment
- Database: Point-in-time recovery

---

## 14. TECHNICAL GAP CHECK

### Missing Technical Decisions
1. ~~AI provider~~ → Google Gemini
2. ~~Hosting~~ → Vercel
3. ~~Database~~ → Firebase
4. ~~Payment~~ → Payamgo

### Conflicting Requirements
- None identified

### Unsupported Requirements
- None identified

### Over-Engineered Areas
- Admin dashboard (simplify for MVP)

### Security Risks
- API key exposure → Environment variables
- SQL injection → Parameterized queries
- XSS → Input sanitization

### Scalability Concerns
- AI costs → Rate limiting
- Database size → Archiving strategy

### Unnecessary Dependencies
- None identified

---

## 15. FINAL FOUNDATION

### Architecture
- Next.js full-stack application
- Firebase for backend services
- API routes for custom logic
- Client-side rendering for interactivity

### Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Firebase (Firestore, Auth, Storage)
- Google Gemini API
- Payamgo (initial) → Better gateway (production)
- Vercel hosting (initial) → Sitebunker (production)

### Project Structure
- Marketing site (public)
- Web app (authenticated)
- Admin dashboard (separate)
- API routes
- Shared components

### Database Plan
- Firestore collections with proper structure
- Security rules for data access
- Indexes for query performance
- Real-time listeners where needed

### API Plan
- RESTful routes
- JWT authentication
- Rate limiting
- Error handling

### Design System
- Color tokens from brand palette
- Inter font family
- Consistent spacing and typography
- shadcn/ui components

### Authentication Architecture
- Firebase Auth
- Email, Google, Apple
- JWT in httpOnly cookies
- Middleware for protection

### Security Foundation
- Environment variables for secrets
- Input validation
- Authorization checks
- Row-level security

### Environment Setup
- Development, staging, production
- Environment variables template

### Testing Foundation
- Vitest for unit/integration
- Playwright for E2E
- TypeScript for type safety

### Deployment Foundation
- Vercel for hosting
- Firebase for database
- Automatic deployments
- SSL included

### Open Technical Decisions
- None remaining

---

*Project Foundation System v1.0*
*Created by No1Vibecoder*
