# LOOKA - DECISION LOG

**Last Updated:** August 17, 2026

---

## Technical Decisions

### 1. Database: Firebase Firestore

**Date:** August 17, 2026  
**Decision:** Use Firebase Firestore as the primary database  
**Reasoning:**
- NoSQL document database - flexible schema
- Real-time data synchronization
- Built-in offline support
- Easy to scale
- Good JavaScript/TypeScript SDK
- Free tier for development
- Google-backed reliability

**Alternatives Considered:**
- Supabase (PostgreSQL) - More complex setup
- MongoDB - Less integrated with auth

---

### 2. AI Provider: Google Gemini

**Date:** August 17, 2026  
**Decision:** Use Google Gemini for AI features  
**Reasoning:**
- Can read and analyze images (notes summarizer)
- Multimodal capabilities (text + vision)
- Good documentation
- Free tier available
- Google-backed reliability

**Alternatives Considered:**
- OpenAI - No native image reading
- Anthropic - More expensive

---

### 3. Payment Gateway: Payamgo

**Date:** August 17, 2026  
**Decision:** Use Payamgo as initial payment gateway  
**Reasoning:**
- Mobile Money support in Cameroon
- Quick setup for MVP
- API available for integration
- Will migrate to better gateway when scaling

**Alternatives Considered:**
- Moniepoint - Will consider for production
- Stripe - Not available in Cameroon

---

### 4. Hosting: Vercel → Sitebunker

**Date:** August 17, 2026  
**Decision:** Start with Vercel, migrate to Sitebunker for production  
**Reasoning:**
- Vercel: Optimized for Next.js, free tier, fast setup
- Sitebunker: Better performance for African users, local hosting

**Migration Plan:**
- Use Vercel for MVP launch
- Migrate after validation
- Better pricing at scale

---

### 5. Styling: Tailwind CSS + shadcn/ui

**Date:** August 17, 2026  
**Decision:** Use Tailwind CSS with shadcn/ui components  
**Reasoning:**
- Utility-first approach for rapid development
- Consistent design system
- Mobile-first responsive design
- Dark mode support built-in
- shadcn/ui: High-quality, accessible components

**Alternatives Considered:**
- CSS Modules - Less consistent
- Material UI - Heavier bundle

---

### 6. Icons: Lucide

**Date:** August 17, 2026  
**Decision:** Use Lucide icon library  
**Reasoning:**
- Consistent with shadcn/ui
- Open source
- Good selection
- Customizable

**Alternatives Considered:**
- Heroicons - Less selection
- Font Awesome - Heavier

---

## Product Decisions

### 7. Freemium Model

**Date:** August 17, 2026  
**Decision:** Freemium with 1 free project, paid for 2+  
**Reasoning:**
- Low barrier to entry
- Clear upgrade path
- Matches Studley AI pattern

**Free Tier:**
- 1 project
- 100 AI messages/day
- 3 summaries/project
- 1 practice session/day

**Paid Tier:**
- Unlimited everything
- Study planner access
- Monthly subscription

---

### 8. Target Exams

**Date:** August 17, 2026  
**Decision:** Focus on GCE, BAC, and class exams  
**Reasoning:**
- Primary exams in Cameroon
- Clear content structure
- Most students need these

---

### 9. Teachers/Institutions Deferred

**Date:** August 17, 2026  
**Decision:** Defer teacher/institution features to v2  
**Reasoning:**
- Reduces MVP complexity
- Focus on core student experience
- Can add later based on feedback

---

## Open Decisions

### 10. Study Planner Exact Functionality

**Status:** Open  
**Question:** How exactly should the study planner work?  
**Options:**
- AI generates schedule from exam date + topics
- User manually creates schedule
- Hybrid approach

---

### 11. Past Questions Content Source

**Status:** Open  
**Question:** Where to get initial past questions?  
**Options:**
- Manual entry
- Partner with schools
- User submissions
- Third-party sources

---

*Project Foundation System v1.0*
