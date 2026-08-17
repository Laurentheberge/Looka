# LOOKA - PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Version:** 1.0  
**Date:** August 17, 2026  
**Status:** Draft  
**Launch Date:** September 6, 2026

---

## 1. PRODUCT GOAL

### Product Goal
Build an AI-assisted exam prep platform specifically for Cameroonian students that helps them prepare for GCE, BAC, and class exams through past questions, AI tutoring, study planning, and notes summarization.

### Primary User Outcome
Students should be able to:
- Access past questions for their specific exams
- Get AI help understanding and answering questions
- Create structured study plans
- Summarize their own notes
- Practice with flashcards and MCQs

### Business Objective
- Acquire users through free tier
- Convert to paid subscribers via project limits
- Build the largest exam prep platform in Cameroon

### MVP Success Criteria
- 100+ registered users within first month
- 10+ paid subscribers within first month
- Positive user reviews and feedback
- Core features working without critical bugs

---

## 2. USERS AND ROLES

### Student (Primary User)

| Capability | Details |
|------------|---------|
| **Who** | Any user who signs up for exam prep |
| **Can See** | Dashboard, past questions, AI chat, study planner, notes summarizer, Q&A sessions |
| **Can Create** | Projects (1 free, unlimited paid), study plans, uploaded notes |
| **Can Edit** | Their own projects, study plans, profile |
| **Can Delete** | Their own projects, uploaded notes, study plans |
| **Cannot Access** | Admin dashboard, other users' data, teacher/institution features (v2) |

### Admin (System Manager)

| Capability | Details |
|------------|---------|
| **Who** | Platform administrators (accessed via separate link) |
| **Can See** | All users, all projects, analytics dashboard, system stats |
| **Can Create** | New admin accounts, system announcements |
| **Can Edit** | Any user account, any project, system settings |
| **Can Delete** | Any user account, any project, inappropriate content |
| **Cannot Access** | Student-facing features (uses separate admin interface) |

---

## 3. USER JOURNEYS

### Journey 1: New Student - First Time User

```
Landing Page (looka.cm)
    ↓
Click "Get Started" / "Sign Up"
    ↓
Sign Up Screen
    - Email + Password
    - Google OAuth
    - Apple Sign-In
    ↓
Onboarding (Optional)
    - Select exam type (GCE, BAC, Other)
    - Select subjects of interest
    ↓
Dashboard (Empty State)
    - Welcome message
    - "Create your first project" CTA
    ↓
Create Project Modal
    - Enter project name (e.g., "GCE Mathematics")
    - Select exam type
    - Select subject
    ↓
Project Created → Redirect to Project Dashboard
    ↓
Choose Action:
    - Browse Past Questions
    - Ask AI Chatbot
    - Upload Notes to Summarize
    - Create Study Plan (Locked - shows upgrade prompt)
    ↓
Hit Free Limit (1 project)
    ↓
Upgrade Prompt Modal
    - "Unlock unlimited projects"
    - Show pricing
    - Subscribe via Mobile Money
```

### Journey 2: Returning Student - Daily Usage

```
Login Screen
    ↓
Dashboard
    - Show existing projects
    - Show recent activity
    ↓
Select Project
    ↓
Project Dashboard
    - AI Chat (right side)
    - Past Questions (browse/search)
    - Notes Summarizer
    - Q&A Practice
    - Study Planner (paid only)
    ↓
Perform Study Session
    ↓
Log Out / Session Timeout
```

### Journey 3: Student - Past Questions Journey

```
Project Dashboard
    ↓
Click "Past Questions"
    ↓
Past Questions Browser
    - Filter by: Exam Type → Subject → Year
    - Search bar
    ↓
Select Question Set
    ↓
Question View
    - Display questions
    - "Ask AI for help" button
    - "Practice this set" button (→ Q&A session)
    ↓
AI Chat Opens (context: selected question)
    ↓
Get Explanation
    ↓
Mark as "Practiced" (optional)
```

### Journey 4: Student - Notes Summarizer Journey

```
Project Dashboard
    ↓
Click "Summarize Notes"
    ↓
Upload Screen
    - Drag & drop file
    - Or click to browse
    - Supported: PDF, Images, Documents
    ↓
Upload Progress
    ↓
Processing State (AI working)
    ↓
Summary Display
    - Clean, formatted summary
    - Key points highlighted
    - "Save to project" option
    ↓
Saved to Project
```

### Journey 5: Student - Study Planner Journey (Paid Only)

```
Project Dashboard
    ↓
Click "Study Planner"
    ↓
If Free User → Upgrade Prompt
If Paid User → Continue
    ↓
Create Study Plan
    - Select exam date (date picker)
    - Select topics to cover
    - Or: Auto-generate from subject
    ↓
AI Generates Schedule
    - Daily breakdown
    - Topic allocation
    - Time estimates
    ↓
Study Plan Dashboard
    - Today's tasks
    - Progress bar
    - Mark complete/incomplete
    ↓
Daily Reminders (notification)
```

### Journey 6: Student - Q&A Practice Session

```
Project Dashboard
    ↓
Click "Practice"
    ↓
Choose Mode
    - Flashcards
    - MCQ Quiz
    ↓
Session Starts
    - Show question
    - User answers
    - Immediate feedback
    - Track progress
    ↓
Session Complete
    - Show results
    - Weak areas identified
    - "Practice more" or "Back to dashboard"
```

### Failure Paths

| Scenario | Behavior |
|----------|----------|
| Network error during upload | Show retry button, preserve file in local state |
| AI chat timeout | Show "Try again" button, keep conversation history |
| Payment fails | Show error message, allow retry, don't create subscription |
| Session expires | Redirect to login, preserve intended destination |
| Invalid file upload | Show file type error, list accepted formats |
| AI generates poor response | Allow user to regenerate, show "Report" option |

---

## 4. INFORMATION ARCHITECTURE

### Main Pages

```
looka.cm (Marketing Site)
├── / (Home/Landing)
├── /features
├── /pricing
├── /about
├── /contact
├── /login
├── /signup
└── /forgot-password

app.looka.cm (Web App - Authenticated)
├── /dashboard
├── /project/:id
│   ├── /chat
│   ├── /past-questions
│   │   ├── /:examType
│   │   │   ├── /:subject
│   │   │   │   └── /:year
│   │   │   └── /:subject
│   │   └── /:examType
│   ├── /summarize
│   ├── /practice
│   │   ├── /flashcards
│   │   └── /mcq
│   └── /study-planner
├── /settings
│   ├── /profile
│   ├── /subscription
│   └── /notifications
└── /upgrade

admin.looka.cm (Admin Dashboard - Separate Link)
├── /dashboard
├── /users
├── /projects
├── /analytics
├── /content
│   └── /past-questions
└── /settings
```

### Navigation Structure

**Marketing Site (Public):**
- Logo (→ home)
- Features
- Pricing
- Login
- Get Started (CTA)

**Web App (Authenticated):**
- Sidebar:
  - Dashboard (icon + label)
  - My Projects (icon + label)
  - Settings (icon + label)
  - Logout (icon + label)
- Top bar:
  - Search
  - Notifications
  - Profile avatar (dropdown)

**Project View (Inside Project):**
- Breadcrumb: Dashboard > Project Name
- Tabs/Navigation:
  - AI Chat
  - Past Questions
  - Summarize Notes
  - Practice
  - Study Planner (locked if free)

### Public Pages
- Landing page
- Features page
- Pricing page
- About page
- Contact page
- Login/Signup pages

### Protected Pages (Requires Auth)
- Dashboard
- All project pages
- Settings
- Upgrade page

### Admin Pages (Requires Admin Role)
- Admin dashboard
- User management
- Content management
- Analytics

---

## 5. FEATURES

### Feature 1: Authentication System

**Purpose:** Secure user registration and login

**User:** All users

**Behavior:**
- Email + password registration
- Google OAuth login
- Apple Sign-In login
- Email verification on signup
- Password reset via email
- Session persistence (remember me)
- Auto-logout after inactivity

**Inputs:**
- Email address
- Password (min 8 characters)
- Name (for new accounts)
- OAuth provider selection

**Outputs:**
- Authenticated session
- User profile data
- Redirect to dashboard

**Rules:**
- Email must be unique
- Password must be at least 8 characters
- OAuth users don't need email verification
- Sessions last 30 days (unless "remember me" unchecked)
- Max 5 failed login attempts → lock for 15 minutes

**Permissions:**
- Anyone can sign up
- Anyone can log in
- Only the user can edit their own profile

**States:**
- Loading: Show spinner during auth check
- Empty: Show login/signup forms
- Success: Redirect to dashboard
- Error: Show specific error message (invalid credentials, email taken, etc.)
- Disabled: Show "Account locked" after too many attempts

**Acceptance Criteria:**
- [ ] User can sign up with email/password
- [ ] User can sign up with Google
- [ ] User can sign up with Apple
- [ ] User receives verification email
- [ ] User can reset password
- [ ] User stays logged in across sessions
- [ ] User can log out
- [ ] Invalid credentials show clear error
- [ ] Account locks after 5 failed attempts

---

### Feature 2: Dashboard

**Purpose:** Central hub showing user's projects and activity

**User:** Student

**Behavior:**
- Display list of user's projects (max 1 for free)
- Show recent activity
- Quick actions (create project, continue studying)
- Upgrade prompt if on free tier

**Inputs:**
- None (displays user's data)

**Outputs:**
- Project cards with name, exam type, last accessed
- Activity feed
- Upgrade CTA (if free)

**Rules:**
- Free users see max 1 project
- Paid users see all projects
- Projects sorted by last accessed
- Empty state shows "Create your first project"

**Permissions:**
- Only the user can see their own projects

**States:**
- Loading: Skeleton loaders
- Empty: "Create your first project" message
- Success: Show projects
- Error: "Failed to load projects, try again"
- Unauthorized: Redirect to login

**Acceptance Criteria:**
- [ ] Dashboard loads within 2 seconds
- [ ] Projects display with correct info
- [ ] Empty state shows for new users
- [ ] Upgrade prompt shows for free users
- [ ] Clicking project navigates to project view
- [ ] "Create Project" button works

---

### Feature 3: Project Management

**Purpose:** Create and manage study projects

**User:** Student

**Behavior:**
- Create new project (name, exam type, subject)
- View project dashboard
- Edit project details
- Delete project (with confirmation)

**Inputs:**
- Project name (text)
- Exam type (dropdown: GCE, BAC, Other)
- Subject (dropdown based on exam type)

**Outputs:**
- Created project with unique ID
- Project dashboard with all features

**Rules:**
- Free users: 1 project max
- Paid users: Unlimited projects
- Project name required, 3-50 characters
- Deleting a project deletes all associated data
- Cannot delete if it's the user's only project (free tier)

**Permissions:**
- Users can only manage their own projects

**States:**
- Loading: Show spinner during creation
- Empty: No projects yet, show CTA
- Success: Project created, redirect to project
- Error: "Failed to create project"
- Disabled: "Upgrade to create more projects" (free tier limit)

**Acceptance Criteria:**
- [ ] Free user cannot create more than 1 project
- [ ] Paid user can create unlimited projects
- [ ] Project creation takes < 3 seconds
- [ ] Project shows in dashboard after creation
- [ ] Delete requires confirmation
- [ ] Deleting project removes all associated data

---

### Feature 4: AI Chatbot

**Purpose:** Provide AI-powered exam assistance and question explanations

**User:** Student

**Behavior:**
- Open chat interface within project
- Send messages to AI
- Receive contextual responses
- Ask about past questions
- Get general knowledge help
- Conversation history within project

**Inputs:**
- User messages (text)
- Context (current project, past question being viewed)

**Outputs:**
- AI responses (text)
- Suggested follow-up questions
- "Was this helpful?" feedback option

**Rules:**
- AI has context of current project (exam type, subject)
- AI can explain past questions
- AI provides general knowledge when asked
- Max 100 messages per day (free tier)
- Unlimited messages (paid tier)
- Responses should be educational, not just answers

**Permissions:**
- Only authenticated users
- Only within their own projects

**States:**
- Loading: Typing indicator
- Empty: Welcome message, suggested prompts
- Success: Message displayed
- Error: "AI is having issues, try again"
- Rate limited: "You've reached your daily limit, upgrade for unlimited"
- Offline: "AI is currently unavailable"

**Acceptance Criteria:**
- [ ] Chat loads within 2 seconds
- [ ] AI responds within 5 seconds
- [ ] AI understands project context
- [ ] Conversation history persists
- [ ] Rate limit shows clear message
- [ ] User can give feedback on responses
- [ ] Chat works on mobile and desktop

---

### Feature 5: Past Questions Browser

**Purpose:** Browse and search exam past questions

**User:** Student

**Behavior:**
- Browse by exam type → subject → year
- Search questions by keyword
- View question details
- Flag questions for practice
- Ask AI for help on specific questions

**Inputs:**
- Exam type selection
- Subject selection
- Year selection
- Search query

**Outputs:**
- List of questions matching filters
- Question details view
- Related questions

**Rules:**
- Questions organized: Exam Type → Subject → Year → Questions
- Search includes question text and topics
- Users can bookmark questions
- Questions can be added to practice session

**Permissions:**
- All authenticated users can browse

**States:**
- Loading: Skeleton loaders
- Empty: "No questions found for this selection"
- Success: Show questions
- Error: "Failed to load questions"
- No results: "No questions match your search"

**Acceptance Criteria:**
- [ ] Filter navigation works correctly
- [ ] Search returns relevant results
- [ ] Questions display with proper formatting
- [ ] Users can bookmark questions
- [ ] "Ask AI" opens chat with question context
- [ ] Works with 1000+ questions without lag

---

### Feature 6: Notes Summarizer

**Purpose:** Upload and summarize study materials using AI

**User:** Student

**Behavior:**
- Upload documents (PDF, images)
- AI processes and summarizes
- Display clean, formatted summary
- Save summary to project
- Copy summary

**Inputs:**
- File upload (PDF, JPG, PNG, DOCX)
- Max file size: 10MB

**Outputs:**
- Formatted text summary
- Key points highlighted
- Save confirmation

**Rules:**
- Free tier: 3 summaries per project
- Paid tier: Unlimited summaries
- Only PDF and image files accepted
- Max file size: 10MB
- Summary length: ~30% of original or key points

**Permissions:**
- Only project owner

**States:**
- Loading: "Processing your document..."
- Empty: Upload prompt
- Success: Show summary
- Error: "Failed to process document, try again"
- Unsupported format: "Please upload PDF or image files"
- Too large: "File too large, max 10MB"
- Limit reached: "Upgrade for unlimited summaries"

**Acceptance Criteria:**
- [ ] Drag and drop upload works
- [ ] File browser upload works
- [ ] PDF files process correctly
- [ ] Image files process correctly
- [ ] Summary is readable and accurate
- [ ] User can save summary
- [ ] User can copy summary
- [ ] Limit message shows for free tier

---

### Feature 7: Q&A Practice Session

**Purpose:** Practice with flashcards and MCQ quizzes

**User:** Student

**Behavior:**
- Choose practice mode (Flashcards or MCQ)
- Start practice session
- Answer questions
- Get immediate feedback
- Track progress
- See results at end

**Inputs:**
- Practice mode selection
- Questions (from past questions or AI-generated)
- User answers

**Outputs:**
- Questions displayed one at a time
- Correct/incorrect feedback
- Session results
- Weak areas identified

**Rules:**
- Free tier: 1 practice session per day
- Paid tier: Unlimited sessions
- Flashcards: Show question → reveal answer → mark known/unknown
- MCQ: 4 options → select one → show correct/incorrect
- Session ends after 10 questions or user stops
- Results show score and weak topics

**Permissions:**
- Only project owner

**States:**
- Loading: "Preparing your practice session..."
- Empty: "Select questions to practice"
- Success: Show results
- Error: "Failed to start session"
- Limit reached: "You've used your free session today"
- No questions: "Add past questions to practice with"

**Acceptance Criteria:**
- [ ] Flashcard mode works correctly
- [ ] MCQ mode works correctly
- [ ] Feedback is immediate
- [ ] Results are accurate
- [ ] Progress is tracked
- [ ] Free tier limit enforced
- [ ] Session can be paused/resumed

---

### Feature 8: Study Planner (Paid Only)

**Purpose:** Create structured study schedules

**User:** Student (Paid)

**Behavior:**
- Set exam date
- Select topics to cover
- AI generates daily study plan
- Track completion
- Get daily reminders

**Inputs:**
- Exam date (date picker)
- Topics (list or auto-generate)
- Hours available per day (optional)

**Outputs:**
- Daily study schedule
- Topic breakdown
- Progress tracking
- Reminder notifications

**Rules:**
- Only available for paid users
- Free users see upgrade prompt
- Plan generated backwards from exam date
- Minimum 7 days before exam
- Can regenerate plan
- Progress saves automatically

**Permissions:**
- Only project owner (paid)

**States:**
- Loading: "Generating your study plan..."
- Empty: "Create your first study plan"
- Success: Show schedule
- Error: "Failed to generate plan"
- Too close: "Exam date too soon (min 7 days)"
- Upgrade prompt: "Upgrade to access Study Planner"

**Acceptance Criteria:**
- [ ] Free users see upgrade prompt
- [ ] Date picker works correctly
- [ ] AI generates realistic schedule
- [ ] Topics are properly distributed
- [ ] Progress tracking works
- [ ] Reminders send correctly
- [ ] Plan can be edited
- [ ] Plan can be regenerated

---

### Feature 9: Subscription & Payment

**Purpose:** Handle paid subscriptions via Mobile Money

**User:** Student

**Behavior:**
- View pricing plans
- Subscribe to paid tier
- Process payment via Mobile Money
- Manage subscription
- Cancel subscription

**Inputs:**
- Plan selection
- Mobile Money number
- Payment confirmation

**Outputs:**
- Active subscription status
- Payment receipt
- Subscription management options

**Rules:**
- Free tier: 1 project, limited features
- Paid tier: Unlimited projects, all features
- Monthly subscription
- Payment via Payamgo or similar
- Subscription auto-renews
- Can cancel anytime
- Downgrade happens at period end

**Permissions:**
- Users can manage their own subscription
- Admin can view all subscriptions

**States:**
- Loading: "Processing payment..."
- Empty: Show pricing plans
- Success: "Subscription active!"
- Error: "Payment failed, try again"
- Cancelled: "Subscription cancelled, downgrade at period end"
- Failed: "Payment failed, please check your account"

**Acceptance Criteria:**
- [ ] Pricing plans display correctly
- [ ] Mobile Money payment works
- [ ] Subscription activates immediately
- [ ] User can view subscription status
- [ ] User can cancel subscription
- [ ] Downgrade happens at period end
- [ ] Payment failures show clear message

---

### Feature 10: User Settings

**Purpose:** Manage profile, preferences, and notifications

**User:** Student

**Behavior:**
- Edit profile (name, email)
- Change password
- Toggle dark/light mode
- Manage notifications
- View subscription status
- Delete account

**Inputs:**
- Profile updates
- Password changes
- Theme preference
- Notification preferences

**Outputs:**
- Updated profile
- Changed password
- Updated theme
- Updated notification settings

**Rules:**
- Email change requires verification
- Password change requires current password
- Account deletion is permanent
- Account deletion requires confirmation

**Permissions:**
- Users can only edit their own settings

**States:**
- Loading: Show skeleton
- Empty: Show defaults
- Success: "Settings saved"
- Error: "Failed to save settings"
- Unsaved changes: "You have unsaved changes"

**Acceptance Criteria:**
- [ ] Profile updates save correctly
- [ ] Password change works
- [ ] Theme toggle works
- [ ] Notification preferences save
- [ ] Account deletion requires confirmation
- [ ] Email change sends verification

---

## 6. MVP BOUNDARY

### MVP (Must Build Now)

1. **Authentication System**
   - Email/password signup
   - Google OAuth
   - Apple Sign-In
   - Password reset
   - Email verification

2. **Dashboard**
   - Project list
   - Recent activity
   - Quick actions
   - Upgrade prompt

3. **Project Management**
   - Create project (name, exam type, subject)
   - View project
   - Edit project
   - Delete project

4. **AI Chatbot**
   - Basic chat interface
   - Context-aware responses
   - Conversation history
   - Rate limiting

5. **Past Questions Browser**
   - Browse by exam type/subject/year
   - Search
   - View questions
   - Bookmark questions

6. **Notes Summarizer**
   - File upload (PDF, images)
   - AI summarization
   - Save summary
   - Copy summary

7. **Q&A Practice**
   - Flashcard mode
   - MCQ mode
   - Session results
   - Progress tracking

8. **Study Planner (Paid)**
   - Date-based planning
   - Topic selection
   - AI schedule generation
   - Progress tracking

9. **Subscription System**
   - Pricing display
   - Mobile Money payment
   - Subscription management
   - Free/paid tier enforcement

10. **Settings**
    - Profile management
    - Password change
    - Dark/light mode
    - Notification preferences

### Post-MVP (Build in v2)

- Teacher accounts and dashboard
- Institution accounts and dashboard
- Content upload by teachers
- Analytics for institutions
- Mobile app
- Gamification (badges, streaks)
- Social features (study groups)
- Advanced analytics
- Offline mode
- Multi-language support

### Excluded (Do Not Build)

- Native mobile apps (iOS/Android)
- Desktop application
- Marketplace for content
- Live tutoring sessions
- Video lectures
- Payment for individual items (only subscriptions)
- Custom avatars/profile pictures
- Friend system
- Public profiles
- Content moderation system

---

## 7. DATA REQUIREMENTS

### Data Entities

#### User
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| email | String | Yes | Unique |
| name | String | Yes | Display name |
| password | String | Yes | Hashed (OAuth users: null) |
| avatar_url | String | No | Profile picture |
| auth_provider | Enum | Yes | email/google/apple |
| role | Enum | Yes | student/admin |
| subscription_status | Enum | Yes | free/active/cancelled |
| subscription_expires_at | DateTime | No | null if free |
| daily_ai_messages | Integer | Yes | Reset daily |
| daily_summaries | Integer | Yes | Reset daily |
| daily_practice_sessions | Integer | Yes | Reset daily |
| created_at | DateTime | Yes | |
| updated_at | DateTime | Yes | |
| last_login_at | DateTime | No | |

#### Project
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| user_id | UUID | Yes | Foreign key → User |
| name | String | Yes | 3-50 characters |
| exam_type | Enum | Yes | gce/bac/other |
| subject | String | Yes | |
| created_at | DateTime | Yes | |
| updated_at | DateTime | Yes | |
| last_accessed_at | DateTime | Yes | For sorting |

#### ChatConversation
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| project_id | UUID | Yes | Foreign key → Project |
| created_at | DateTime | Yes | |
| updated_at | DateTime | Yes | |

#### ChatMessage
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| conversation_id | UUID | Yes | Foreign key → ChatConversation |
| role | Enum | Yes | user/assistant |
| content | Text | Yes | |
| created_at | DateTime | Yes | |

#### PastQuestion
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| exam_type | Enum | Yes | gce/bac/other |
| subject | String | Yes | |
| year | Integer | Yes | |
| question_text | Text | Yes | |
| options | JSON | No | For MCQ |
| correct_answer | String | No | |
| explanation | Text | No | |
| topics | Array | No | Tags |
| created_at | DateTime | Yes | |

#### BookmarkedQuestion
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| user_id | UUID | Yes | Foreign key → User |
| question_id | UUID | Yes | Foreign key → PastQuestion |
| created_at | DateTime | Yes | |

#### UploadedNote
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| project_id | UUID | Yes | Foreign key → Project |
| file_name | String | Yes | Original filename |
| file_url | String | Yes | Storage URL |
| file_type | String | Yes | pdf/jpg/png/docx |
| file_size | Integer | Yes | In bytes |
| summary | Text | No | AI-generated |
| created_at | DateTime | Yes | |

#### StudyPlan
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| project_id | UUID | Yes | Foreign key → Project |
| exam_date | Date | Yes | |
| topics | JSON | Yes | List of topics |
| daily_schedule | JSON | Yes | AI-generated |
| created_at | DateTime | Yes | |
| updated_at | DateTime | Yes | |

#### StudyPlanTask
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| study_plan_id | UUID | Yes | Foreign key → StudyPlan |
| date | Date | Yes | |
| topic | String | Yes | |
| completed | Boolean | Yes | Default false |
| completed_at | DateTime | No | |

#### PracticeSession
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| project_id | UUID | Yes | Foreign key → Project |
| user_id | UUID | Yes | Foreign key → User |
| mode | Enum | Yes | flashcards/mcq |
| questions | JSON | Yes | Array of question IDs |
| results | JSON | Yes | Answers and scores |
| score | Float | No | Percentage |
| created_at | DateTime | Yes | |

#### Subscription
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | Yes | Primary key |
| user_id | UUID | Yes | Foreign key → User |
| status | Enum | Yes | active/cancelled/expired |
| plan | Enum | Yes | monthly |
| amount | Decimal | Yes | In XAF |
| payment_method | String | Yes | mobile_money |
| payment_reference | String | Yes | Transaction ID |
| starts_at | DateTime | Yes | |
| expires_at | DateTime | Yes | |
| created_at | DateTime | Yes | |

### Data Relationships

```
User 1→N Project
User 1→N BookmarkedQuestion
User 1→N Subscription
User 1→N PracticeSession

Project 1→N ChatConversation
Project 1→N UploadedNote
Project 1→N StudyPlan
Project 1→N PracticeSession

ChatConversation 1→N ChatMessage

PastQuestion 1→N BookmarkedQuestion

StudyPlan 1→N StudyPlanTask
```

### Data Lifecycle

| Entity | Creation | Update | Deletion |
|--------|----------|--------|----------|
| User | On signup | On profile edit | On account deletion (soft delete) |
| Project | On creation | On edit | On user delete (cascade) |
| ChatMessage | On chat | Never | On project delete (cascade) |
| PastQuestion | Admin upload | Admin edit | Admin delete |
| UploadedNote | On upload | Never | On project delete (cascade) |
| StudyPlan | On creation | On regeneration | On project delete (cascade) |
| Subscription | On payment | On renewal/cancel | Never (archive) |

### Retention Requirements

| Data | Retention |
|------|-----------|
| User accounts | Until deleted by user or admin |
| Projects | Until deleted by user |
| Chat history | 90 days |
| Uploaded notes | Until deleted by user |
| Study plans | Until deleted by user |
| Practice sessions | 90 days |
| Subscriptions | 1 year (archive) |
| Analytics | 1 year |

---

## 8. AUTHENTICATION AND AUTHORIZATION

### Sign Up

**Methods:**
1. Email + Password
2. Google OAuth
3. Apple Sign-In

**Flow:**
1. User enters email/password OR clicks OAuth button
2. For email: Send verification email
3. For OAuth: Redirect to provider → callback
4. Create user account
5. Redirect to onboarding/dashboard

**Validation:**
- Email: Valid format, unique
- Password: Min 8 characters
- Name: Required, 2-100 characters

### Sign In

**Methods:**
1. Email + Password
2. Google OAuth
3. Apple Sign-In

**Flow:**
1. User enters credentials
2. Validate against database
3. Check if account is locked
4. Create session
5. Redirect to dashboard

**Security:**
- Max 5 failed attempts → lock 15 minutes
- Session token: JWT, 30-day expiry
- Secure, HttpOnly cookies

### Sign Out

**Flow:**
1. User clicks logout
2. Invalidate session
3. Clear cookies
4. Redirect to landing page

### Password Reset

**Flow:**
1. User clicks "Forgot password"
2. Enter email address
3. Send reset link (valid 1 hour)
4. User clicks link
5. Enter new password
6. Confirm password
7. Update password
8. Redirect to login

### OAuth

**Google:**
- Use Google OAuth 2.0
- Scopes: email, profile
- Store: email, name, avatar

**Apple:**
- Use Apple Sign-In
- Scopes: email, name
- Store: email, name (if provided)

### User Roles

| Role | Permissions |
|------|-------------|
| Student | Full access to student features |
| Admin | Full system access via admin dashboard |

### Permissions Matrix

| Action | Student | Admin |
|--------|---------|-------|
| Create project | ✅ (limit: 1 free) | ✅ |
| Edit own project | ✅ | ✅ |
| Edit any project | ❌ | ✅ |
| Delete own project | ✅ | ✅ |
| Delete any project | ❌ | ✅ |
| View own data | ✅ | ✅ |
| View any user data | ❌ | ✅ |
| Manage users | ❌ | ✅ |
| Manage content | ❌ | ✅ |
| View analytics | ❌ | ✅ |
| Access admin | ❌ | ✅ |

### Protected Areas

- All `/app/*` routes require authentication
- All `/admin/*` routes require admin role
- API endpoints validate tokens
- Unauthenticated users redirect to `/login`

---

## 9. INTEGRATIONS

### AI Service (Chatbot & Summarizer)

| Aspect | Details |
|--------|---------|
| **Purpose** | Power AI chatbot and notes summarizer |
| **Provider** | Google Gemini API (or similar) |
| **Data Exchanged** | User messages → AI responses; Documents → Summaries |
| **When Used** | Every chat message, every note upload |
| **Failure Behavior** | Show "AI unavailable, try again" message |
| **MVP Required** | Yes |

### OAuth Providers

| Aspect | Details |
|--------|---------|
| **Purpose** | Social login (Google, Apple) |
| **Provider** | Google OAuth, Apple Sign-In |
| **Data Exchanged** | Email, name, avatar |
| **When Used** | On signup/login via OAuth |
| **Failure Behavior** | Fall back to email/password |
| **MVP Required** | Yes |

### Payment Processor

| Aspect | Details |
|--------|---------|
| **Purpose** | Process Mobile Money payments |
| **Provider** | Payamgo (or similar) |
| **Data Exchanged** | Payment amount, user ID, transaction reference |
| **When Used** | On subscription purchase/renewal |
| **Failure Behavior** | Show "Payment failed, try again" |
| **MVP Required** | Yes |

### Email Service

| Aspect | Details |
|--------|---------|
| **Purpose** | Send transactional emails |
| **Provider** | SendGrid, Mailgun, or similar |
| **Data Exchanged** | Email address, template data |
| **When Used** | Verification, password reset, receipts |
| **Failure Behavior** | Queue for retry, show warning |
| **MVP Required** | Yes |

### File Storage

| Aspect | Details |
|--------|---------|
| **Purpose** | Store uploaded notes |
| **Provider** | AWS S3, Cloudflare R2, or similar |
| **Data Exchanged** | Files, metadata |
| **When Used** | On note upload |
| **Failure Behavior** | Show "Upload failed, try again" |
| **MVP Required** | Yes |

### Database

| Aspect | Details |
|--------|---------|
| **Purpose** | Store all application data |
| **Provider** | Firebase Firestore |
| **Data Exchanged** | All CRUD operations |
| **When Used** | Every user action |
| **Failure Behavior** | Show error, retry |
| **MVP Required** | Yes |

---

## 10. BUSINESS LOGIC

### Subscription Rules

1. **Free Tier Limits:**
   - 1 project maximum
   - 100 AI messages per day
   - 3 note summaries per project
   - 1 practice session per day
   - No study planner access

2. **Paid Tier Limits:**
   - Unlimited projects
   - Unlimited AI messages
   - Unlimited note summaries
   - Unlimited practice sessions
   - Full study planner access

3. **Limit Enforcement:**
   - Daily limits reset at midnight (user's timezone)
   - Counters stored in database
   - Checked before each action
   - Show clear message when limit reached

4. **Subscription Lifecycle:**
   - New subscription: Immediate access
   - Renewal: Automatic on expiry date
   - Cancellation: Access until period end
   - Payment failure: Grace period 3 days, then downgrade
   - Downgrade: Remove access to paid features, keep data

### Project Rules

1. **Creation:**
   - Free users: Max 1 project
   - Paid users: Unlimited projects
   - Name required, 3-50 characters
   - Exam type and subject required

2. **Deletion:**
   - Requires confirmation
   - Deletes all associated data (chat, notes, plans)
   - Cannot delete if it's user's only project (free tier)

3. **Access:**
   - Only owner can access their projects
   - Admin can access all projects

### AI Chat Rules

1. **Rate Limiting:**
   - Free: 100 messages/day
   - Paid: Unlimited
   - Counter resets daily

2. **Context:**
   - AI knows current project (exam type, subject)
   - AI can access past questions if user shares
   - AI provides educational responses

3. **Content:**
   - AI should not give direct answers to exam questions
   - AI should explain concepts and reasoning
   - AI should encourage learning

### Notes Summarizer Rules

1. **Limits:**
   - Free: 3 summaries per project
   - Paid: Unlimited
   - Counter per project, not global

2. **File Rules:**
   - Accepted: PDF, JPG, PNG, DOCX
   - Max size: 10MB
   - One file at a time

3. **Processing:**
   - AI extracts text
   - AI generates summary
   - Summary saved to project

### Study Planner Rules

1. **Availability:**
   - Paid users only
   - Free users see upgrade prompt

2. **Planning:**
   - Minimum 7 days before exam
   - AI distributes topics evenly
   - Can include breaks/rest days

3. **Progress:**
   - Tasks marked complete manually
   - Progress percentage calculated
   - Streaks tracked (optional)

### Payment Rules

1. **Processing:**
   - Mobile Money via Payamgo
   - Amount in XAF
   - Monthly billing

2. **Failures:**
   - 3-day grace period
   - Retry payment automatically
   - After grace: downgrade to free

3. **Refunds:**
   - No refunds for partial periods
   - Contact support for issues

---

## 11. UX STATES

### Authentication Pages

| State | Behavior |
|-------|----------|
| Loading | Spinner while checking auth |
| Empty | Show login/signup form |
| Success | Redirect to dashboard |
| Error | Show error message (invalid credentials, etc.) |
| Rate Limited | "Too many attempts, try again in X minutes" |

### Dashboard

| State | Behavior |
|-------|----------|
| Loading | Skeleton loaders for projects |
| Empty | "Create your first project" with CTA |
| Success | Show project list and activity |
| Error | "Failed to load, try again" |
| Unauthorized | Redirect to login |

### Project View

| State | Behavior |
|-------|----------|
| Loading | Skeleton loaders |
| Empty | Welcome message with quick actions |
| Success | Show all features |
| Error | "Failed to load project" |
| Not Found | "Project not found" with back button |
| Unauthorized | Redirect to login |

### AI Chat

| State | Behavior |
|-------|----------|
| Loading | Typing indicator |
| Empty | Welcome message, suggested prompts |
| Success | Show messages |
| Error | "AI unavailable, try again" |
| Rate Limited | "Daily limit reached, upgrade for unlimited" |
| Offline | "Connection lost, messages will send when back" |

### Past Questions

| State | Behavior |
|-------|----------|
| Loading | Skeleton loaders |
| Empty | "No questions found" |
| Success | Show questions |
| Error | "Failed to load questions" |
| No Results | "No matches for your search" |

### Notes Summarizer

| State | Behavior |
|-------|----------|
| Loading | "Processing your document..." |
| Empty | Upload prompt with drag & drop |
| Success | Show summary |
| Error | "Failed to process, try again" |
| Unsupported | "Please upload PDF or images" |
| Too Large | "File too large, max 10MB" |
| Limit Reached | "Upgrade for unlimited summaries" |

### Q&A Practice

| State | Behavior |
|-------|----------|
| Loading | "Preparing practice session..." |
| Empty | "Select questions to practice" |
| Success | Show results |
| Error | "Failed to start session" |
| Limit Reached | "Free session used today, upgrade for unlimited" |
| No Questions | "Add past questions to practice" |

### Study Planner

| State | Behavior |
|-------|----------|
| Loading | "Generating your study plan..." |
| Empty | "Create your first study plan" |
| Success | Show schedule |
| Error | "Failed to generate plan" |
| Too Close | "Exam date too soon (min 7 days)" |
| Upgrade Prompt | "Upgrade to access Study Planner" |

### Subscription/Payment

| State | Behavior |
|-------|----------|
| Loading | "Processing payment..." |
| Empty | Show pricing plans |
| Success | "Subscription activated!" |
| Error | "Payment failed, try again" |
| Cancelled | "Subscription cancelled" |
| Failed | "Payment failed, check your account" |

---

## 12. NON-FUNCTIONAL REQUIREMENTS

### Security

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with secure, HttpOnly cookies
- CSRF protection on forms
- Input validation and sanitization
- Rate limiting on API endpoints
- HTTPS enforced
- SQL injection prevention
- XSS prevention

### Performance

- Landing page loads < 2 seconds
- Dashboard loads < 2 seconds
- AI responses < 5 seconds
- File upload feedback < 1 second
- Database queries < 500ms
- Image optimization for uploads

### Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast (WCAG AA)
- Alt text on images
- Focus indicators

### Responsiveness

- Mobile-first design
- Breakpoints: 320px, 768px, 1024px, 1280px
- Touch-friendly targets (min 44px)
- Readable text without zoom
- No horizontal scroll

### Reliability

- 99.5% uptime target
- Graceful error handling
- Offline fallback where possible
- Data backup daily
- Error logging and monitoring

### Privacy

- GDPR-like data handling
- User can export their data
- User can delete their account
- No data selling to third parties
- Clear privacy policy

### Scalability

- Stateless API design
- Database indexing on frequent queries
- CDN for static assets
- Caching for repeated queries
- Horizontal scaling possible

---

## 13. ACCEPTANCE CRITERIA

### Authentication

- [ ] User can sign up with email/password
- [ ] User receives verification email within 2 minutes
- [ ] User can verify email and login
- [ ] User can sign up with Google
- [ ] User can sign up with Apple
- [ ] User can reset password via email
- [ ] Password reset link expires after 1 hour
- [ ] Account locks after 5 failed attempts
- [ ] Account unlocks after 15 minutes
- [ ] Session persists across browser restarts
- [ ] User can logout successfully

### Dashboard

- [ ] Dashboard loads within 2 seconds
- [ ] Projects display correctly
- [ ] Empty state shows for new users
- [ ] Upgrade prompt shows for free users
- [ ] Clicking project navigates correctly
- [ ] Recent activity displays

### Project Management

- [ ] Free user cannot create more than 1 project
- [ ] Paid user can create unlimited projects
- [ ] Project creation takes < 3 seconds
- [ ] Project details save correctly
- [ ] Delete requires confirmation
- [ ] Deleting project removes all data

### AI Chatbot

- [ ] Chat loads within 2 seconds
- [ ] AI responds within 5 seconds
- [ ] AI understands project context
- [ ] Conversation history saves
- [ ] Rate limit message shows for free users
- [ ] User can give feedback

### Past Questions

- [ ] Filter navigation works
- [ ] Search returns relevant results
- [ ] Questions display correctly
- [ ] Users can bookmark questions
- [ ] "Ask AI" opens chat with context

### Notes Summarizer

- [ ] Drag and drop upload works
- [ ] File browser upload works
- [ ] PDF files process correctly
- [ ] Image files process correctly
- [ ] Summary is readable
- [ ] User can save summary
- [ ] Limit message shows for free users

### Q&A Practice

- [ ] Flashcard mode works
- [ ] MCQ mode works
- [ ] Feedback is immediate
- [ ] Results are accurate
- [ ] Free tier limit enforced

### Study Planner

- [ ] Free users see upgrade prompt
- [ ] Date picker works
- [ ] AI generates realistic schedule
- [ ] Progress tracking works
- [ ] Reminders send correctly

### Subscription

- [ ] Pricing plans display
- [ ] Mobile Money payment works
- [ ] Subscription activates immediately
- [ ] User can view subscription
- [ ] User can cancel subscription
- [ ] Downgrade happens at period end

### Settings

- [ ] Profile updates save
- [ ] Password change works
- [ ] Theme toggle works
- [ ] Notification preferences save
- [ ] Account deletion works

---

## 14. OPEN QUESTIONS

### Critical (Must Resolve Before Build)

1. **AI Provider** - Which AI API to use? (Google Gemini, OpenAI, other?)
2. **Hosting** - Sitebunker confirmed? Or alternatives?
3. **Database** - Firebase Firestore
4. **Payment Integration** - Payamgo API availability?

### Important (Can Resolve During Build)

5. **Exam Types** - Exact list of GCE/BAC subjects?
6. **Past Questions Source** - Where to get initial content?
7. **Study Planner AI** - Custom logic or API call?
8. **Email Service** - SendGrid, Mailgun, or other?

### Nice to Have (Post-MVP)

9. **Analytics Provider** - Mixpanel, PostHog, or custom?
10. **Error Tracking** - Sentry or similar?
11. **Monitoring** - Uptime and performance tools?

---

## 15. SCOPE RISKS

### High Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| 3-week timeline | MVP may not be complete | Prioritize core features, cut polish |
| Limited coding experience | Code quality issues | Use AI tools, follow best practices |
| Payment integration | May not work on time | Have fallback (manual activation) |
| AI costs | May exceed budget | Implement strict rate limiting |

### Medium Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| Past questions content | No content at launch | Manual entry of sample questions |
| Mobile responsiveness | Poor mobile experience | Mobile-first development |
| Performance issues | Slow load times | Optimize early, test often |
| Security vulnerabilities | Data breach | Follow security checklist |

### Low Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| Design inconsistency | Unprofessional look | Use design system |
| Browser compatibility | Some users can't access | Test on major browsers |
| SEO | Low traffic | Basic SEO setup |

---

## 16. FINAL OUTPUT

### 1. Product Goal
Build an AI-assisted exam prep platform for Cameroonian students with past questions, AI tutoring, study planning, and notes summarization.

### 2. Users and Roles
- **Student:** Full access to all features (within tier limits)
- **Admin:** Full system access via separate dashboard
- **Teacher/Institution:** Deferred to v2

### 3. User Journeys
- New student signup → onboarding → first project → study
- Returning student → login → dashboard → continue studying
- Past questions browsing → AI help → practice
- Notes upload → summarization → save
- Study plan creation → daily tracking → exam success

### 4. Information Architecture
- Marketing site (public)
- Web app (authenticated)
- Admin dashboard (separate link)

### 5. MVP Features
1. Authentication (Email, Google, Apple)
2. Dashboard with project list
3. Project management
4. AI Chatbot
5. Past Questions Browser
6. Notes Summarizer
7. Q&A Practice (Flashcards + MCQ)
8. Study Planner (Paid only)
9. Subscription & Payment
10. User Settings

### 6. Business Rules
- Free: 1 project, limited AI/summaries/practice
- Paid: Unlimited everything
- Daily limits reset at midnight
- Mobile Money payment via Payamgo

### 7. Data Requirements
- Users, Projects, Chat, Past Questions, Notes, Study Plans, Practice Sessions, Subscriptions

### 8. Authentication and Permissions
- Email/password, Google OAuth, Apple Sign-In
- Student: Own data only
- Admin: All data

### 9. Integrations
- AI API (Google Gemini or similar)
- OAuth (Google, Apple)
- Payment (Payamgo)
- Email (SendGrid)
- Storage (Firebase Storage)
- Database (Firebase Firestore)

### 10. Acceptance Criteria
- All features have specific, testable criteria
- See Section 13 for full list

### 11. Open Questions
- AI provider selection
- Hosting confirmation
- Database choice
- Payment integration details

### 12. Scope Risks
- Timeline (3 weeks) is aggressive
- Limited coding experience
- Payment integration may need fallback
- AI costs need monitoring

---

*Project Foundation System v1.0*
*Created by No1Vibecoder*
