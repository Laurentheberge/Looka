# LOOKA - AI CONTEXT

**Last Updated:** August 17, 2026

---

## Project Overview

**Name:** Looka  
**Type:** AI-Assisted Exam Prep Platform  
**Target:** Cameroonian students (GCE, BAC, class exams)  
**Launch:** September 6, 2026

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Firebase Firestore |
| Auth | Firebase Auth |
| Storage | Firebase Storage |
| AI | Google Gemini |
| Payment | Payamgo |
| Hosting | Vercel (initial) → Sitebunker |

---

## Project Structure

```
looka/
├── src/
│   ├── app/              # Pages and API routes
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities and integrations
│   ├── hooks/            # React hooks
│   └── types/            # TypeScript types
├── docs/                 # Documentation
├── public/               # Static assets
└── tests/                # Test files
```

---

## Key Files

| File | Purpose |
|------|---------|
| `docs/PROJECT_BRIEF.md` | Project overview and goals |
| `docs/PRD.md` | Product requirements |
| `docs/ARCHITECTURE.md` | Technical architecture |
| `docs/DATABASE.md` | Firestore schema |
| `docs/API.md` | API routes |
| `docs/DESIGN_SYSTEM.md` | UI/UX design system |
| `docs/TASKS.md` | Current tasks |
| `docs/DECISIONS.md` | Decision log |
| `docs/CHANGELOG.md` | Change history |

---

## Core Features (MVP)

1. **Authentication** - Email, Google, Apple sign-in
2. **Dashboard** - Project list, recent activity
3. **Projects** - Create/manage study projects
4. **AI Chat** - Gemini-powered exam assistance
5. **Past Questions** - Browse by exam/subject/year
6. **Notes Summarizer** - Upload and summarize with AI
7. **Q&A Practice** - Flashcards and MCQ
8. **Study Planner** - Daily schedule (paid only)
9. **Subscription** - Payamgo Mobile Money
10. **Settings** - Profile, theme, notifications

---

## Design Tokens

```css
--color-paper: #F2ECDD    /* Background */
--color-navy: #0F1B33     /* Hero/Footer */
--color-gold: #E8A33D     /* CTAs/Highlights */
--color-green: #2F6E4F    /* Success/Trust */
--color-ink: #14213D      /* Text */
```

---

## Important Rules

- Mobile-first responsive design
- Dark/light mode support
- No emojis as UI icons
- Use Lucide icons only
- Accessible UI patterns (WCAG AA)
- Validate all inputs server-side
- Never expose secrets client-side

---

## Current Status

**Phase:** Project Foundation  
**Step:** 4 - AI Configuration  
**Next:** Step 5 - Implementation

---

*Project Foundation System v1.0*
