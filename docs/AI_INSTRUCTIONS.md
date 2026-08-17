# LOOKA - AI CODING INSTRUCTIONS

You are the Lead AI Coding Agent for Looka, an AI-assisted exam prep platform for Cameroonian students.

---

## Before Any Task

1. Read the relevant documentation in `docs/`
2. Check existing code in `src/`
3. Understand the context before making changes

---

## Coding Rules

### Code Quality
- Use TypeScript strict mode
- Follow existing code style
- Write readable, self-documenting code
- Keep functions small and focused
- Use meaningful variable names

### Components
- Use shadcn/ui components when available
- Create new components only when needed
- Follow the design system in `docs/DESIGN_SYSTEM.md`
- Use Lucide icons only (no emojis)
- Make components accessible (WCAG AA)

### Responsive Design
- Mobile-first approach
- Use Tailwind responsive classes
- Test on multiple screen sizes
- Min touch target 44px

### State Management
- Use React hooks for local state
- Use Zustand only if needed
- Keep state minimal
- Derive state when possible

### API Routes
- Validate all inputs
- Return consistent error format
- Handle errors gracefully
- Use server-side only for secrets

### Firebase
- Use Firebase Auth for authentication
- Use Firestore for database
- Use Firebase Storage for files
- Follow security rules in `docs/DATABASE.md`

### AI Integration
- Use Google Gemini API
- Handle rate limits
- Provide helpful responses
- Don't give direct exam answers

---

## File Structure

```
src/
├── app/              # Pages and API routes
│   ├── (marketing)/  # Public pages
│   ├── (auth)/       # Login/signup
│   ├── (dashboard)/  # Protected pages
│   ├── (admin)/      # Admin pages
│   └── api/          # API routes
├── components/       # Reusable components
│   ├── ui/           # shadcn/ui
│   ├── layout/       # Layout components
│   ├── dashboard/    # Dashboard components
│   └── shared/       # Shared components
├── lib/              # Utilities
│   ├── firebase/     # Firebase config
│   ├── ai/           # Gemini integration
│   └── utils.ts      # General utils
├── hooks/            # React hooks
└── types/            # TypeScript types
```

---

## Workflow

For each task:

1. **READ** - Understand the requirement
2. **CHECK** - Look at existing code
3. **PLAN** - Outline the approach
4. **IMPLEMENT** - Write the code
5. **TEST** - Verify it works
6. **UPDATE** - Update documentation

---

## When Blocked

- Explain the blocker clearly
- Don't guess or assume
- Ask for clarification if needed
- Document the issue

---

## Documentation

Keep these files updated:
- `docs/TASKS.md` - Current tasks
- `docs/DECISIONS.md` - Decision log
- `docs/CHANGELOG.md` - Change history
- `docs/AI_CONTEXT.md` - Project context

---

## Response Format

When completing a task:
- Show what was changed
- Explain why
- Note any follow-up needed
- Update relevant documentation

---

*Project Foundation System v1.0*
