# LOOKA - DESIGN SYSTEM

**Version:** 1.0  
**Date:** August 17, 2026  
**Status:** Draft

---

## Overview

This document defines the design system for Looka, including colors, typography, spacing, components, and patterns.

**Design Principles:**
1. Clean and minimal
2. Friendly but professional
3. Mobile-first responsive
4. Accessible (WCAG AA)
5. Consistent across all pages

---

## Colors

### Brand Colors

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--color-paper` | Warm Paper | `#F2ECDD` | Background (light sections) |
| `--color-navy` | Deep Navy | `#0F1B33` | Hero, footer, primary text |
| `--color-gold` | Gold | `#E8A33D` | CTAs, highlights, accents |
| `--color-green` | Forest Green | `#2F6E4F` | Success, trust indicators |
| `--color-ink` | Ink | `#14213D` | Text on paper background |

### Neutral Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-white` | `#FFFFFF` | Cards, modals |
| `--color-gray-50` | `#F9FAFB` | Subtle backgrounds |
| `--color-gray-100` | `#F3F4F6` | Borders, dividers |
| `--color-gray-200` | `#E5E7EB` | Disabled states |
| `--color-gray-300` | `#D1D5DB` | Placeholder text |
| `--color-gray-400` | `#9CA3AF` | Icons |
| `--color-gray-500` | `#6B7280` | Secondary text |
| `--color-gray-600` | `#4B5563` | Body text |
| `--color-gray-700` | `#374151` | Headings |
| `--color-gray-800` | `#1F2937` | Dark mode backgrounds |
| `--color-gray-900` | `#111827` | Dark mode text |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-error` | `#DC2626` | Errors, destructive actions |
| `--color-warning` | `#F59E0B` | Warnings, caution |
| `--color-success` | `#10B981` | Success messages |
| `--color-info` | `#3B82F6` | Information |

### Dark Mode

```css
.dark {
  --color-paper: #1A1A2E;
  --color-navy: #F2ECDD;
  --color-ink: #F2ECDD;
  --color-white: #1F2937;
  --color-gray-50: #111827;
  --color-gray-100: #1F2937;
  --color-gray-800: #F9FAFB;
  --color-gray-900: #F3F4F6;
}
```

---

## Typography

### Font Families

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Sizes

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-xs` | 0.75rem (12px) | 1rem | Captions, labels |
| `--text-sm` | 0.875rem (14px) | 1.25rem | Small text, helper text |
| `--text-base` | 1rem (16px) | 1.5rem | Body text |
| `--text-lg` | 1.125rem (18px) | 1.75rem | Large body text |
| `--text-xl` | 1.25rem (20px) | 1.75rem | Subheadings |
| `--text-2xl` | 1.5rem (24px) | 2rem | Section headings |
| `--text-3xl` | 1.875rem (30px) | 2.25rem | Page titles |
| `--text-4xl` | 2.25rem (36px) | 2.5rem | Hero headings |

### Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `--font-normal` | 400 | Body text |
| `--font-medium` | 500 | Emphasis |
| `--font-semibold` | 600 | Headings, buttons |
| `--font-bold` | 700 | Strong emphasis |

### Typography Scale

```
Hero Heading:     text-4xl font-bold
Page Heading:     text-3xl font-bold
Section Heading:  text-2xl font-semibold
Subheading:       text-xl font-semibold
Body Large:       text-lg font-normal
Body:             text-base font-normal
Body Small:       text-sm font-normal
Caption:          text-xs font-normal
```

---

## Spacing

### Spacing Scale

| Token | Size | Usage |
|-------|------|-------|
| `--space-0` | 0 | Reset |
| `--space-1` | 0.25rem (4px) | Tight spacing |
| `--space-2` | 0.5rem (8px) | Small spacing |
| `--space-3` | 0.75rem (12px) | Medium-small spacing |
| `--space-4` | 1rem (16px) | Medium spacing |
| `--space-5` | 1.25rem (20px) | Medium-large spacing |
| `--space-6` | 1.5rem (24px) | Large spacing |
| `--space-8` | 2rem (32px) | Extra large spacing |
| `--space-10` | 2.5rem (40px) | Section spacing |
| `--space-12` | 3rem (48px) | Large section spacing |
| `--space-16` | 4rem (64px) | Page section spacing |
| `--space-20` | 5rem (80px) | Hero spacing |
| `--space-24` | 6rem (96px) | Large hero spacing |

### Layout Spacing

```css
/* Page padding */
.page-padding {
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .page-padding {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

/* Section spacing */
.section {
  margin-top: var(--space-16);
  margin-bottom: var(--space-16);
}

/* Card padding */
.card-padding {
  padding: var(--space-6);
}

/* Inline spacing */
.inline-gap {
  gap: var(--space-2);
}
```

---

## Border Radius

| Token | Size | Usage |
|-------|------|-------|
| `--radius-none` | 0 | No radius |
| `--radius-sm` | 0.25rem (4px) | Small elements |
| `--radius-md` | 0.375rem (6px) | Inputs, small cards |
| `--radius-lg` | 0.5rem (8px) | Buttons, cards |
| `--radius-xl` | 0.75rem (12px) | Modals, large cards |
| `--radius-2xl` | 1rem (16px) | Hero sections |
| `--radius-full` | 9999px | Pills, circles |

---

## Shadows

| Token | Usage |
|-------|-------|
| `--shadow-sm` | Subtle elevation |
| `--shadow-md` | Cards, dropdowns |
| `--shadow-lg` | Modals, popovers |
| `--shadow-xl` | Floating elements |

```css
/* Card shadow */
.card {
  box-shadow: var(--shadow-md);
}

/* Hover state */
.card:hover {
  box-shadow: var(--shadow-lg);
}

/* Modal shadow */
.modal {
  box-shadow: var(--shadow-xl);
}
```

---

## Layout

### Page Structure

```css
/* Marketing page */
.marketing-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.marketing-page main {
  flex: 1;
}

/* Dashboard page */
.dashboard-page {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

@media (max-width: 768px) {
  .dashboard-page {
    grid-template-columns: 1fr;
  }
}
```

### Container

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}
```

### Grid System

```css
/* 2 column grid */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 3 column grid */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .grid-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## Breakpoints

| Name | Size | Usage |
|------|------|-------|
| `sm` | 640px | Tablet portrait |
| `md` | 768px | Tablet landscape, small desktop |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

### Mobile-First Approach

```css
/* Base styles (mobile) */
.element {
  padding: var(--space-4);
  font-size: var(--text-base);
}

/* Tablet */
@media (min-width: 768px) {
  .element {
    padding: var(--space-6);
    font-size: var(--text-lg);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .element {
    padding: var(--space-8);
    font-size: var(--text-xl);
  }
}
```

---

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  background-color: var(--color-gold);
  color: var(--color-navy);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  min-height: 44px;
}

.btn-primary:hover {
  background-color: #D4922E;
}

.btn-primary:disabled {
  background-color: var(--color-gray-300);
  cursor: not-allowed;
}
```

#### Secondary Button
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  background-color: transparent;
  color: var(--color-navy);
  border: 2px solid var(--color-navy);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  cursor: pointer;
  min-height: 44px;
}

.btn-secondary:hover {
  background-color: var(--color-navy);
  color: var(--color-white);
}
```

#### Ghost Button
```css
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  background-color: transparent;
  color: var(--color-navy);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  min-height: 44px;
}

.btn-ghost:hover {
  background-color: var(--color-gray-100);
}
```

#### Button Sizes
```css
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  min-height: 36px;
}

.btn-md {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  min-height: 44px;
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
  min-height: 52px;
}
```

---

### Inputs

#### Text Input
```css
.input {
  width: 100%;
  padding: var(--space-3);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  color: var(--color-gray-900);
  transition: border-color 0.2s, box-shadow 0.2s;
  min-height: 44px;
}

.input:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(232, 163, 61, 0.1);
}

.input::placeholder {
  color: var(--color-gray-400);
}

.input:disabled {
  background-color: var(--color-gray-100);
  cursor: not-allowed;
}
```

#### Textarea
```css
.textarea {
  width: 100%;
  padding: var(--space-3);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  color: var(--color-gray-900);
  resize: vertical;
  min-height: 100px;
}

.textarea:focus {
  outline: none;
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(232, 163, 61, 0.1);
}
```

#### Select
```css
.select {
  width: 100%;
  padding: var(--space-3);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  color: var(--color-gray-900);
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right var(--space-3) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: var(--space-10);
  min-height: 44px;
}
```

---

### Cards

#### Basic Card
```css
.card {
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}
```

#### Card with Border
```css
.card-bordered {
  background-color: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}
```

#### Card States
```css
.card-interactive {
  cursor: pointer;
}

.card-interactive:hover {
  border-color: var(--color-gold);
}

.card-selected {
  border-color: var(--color-gold);
  background-color: rgba(232, 163, 61, 0.05);
}
```

---

### Modals

#### Modal Overlay
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  z-index: 50;
}
```

#### Modal Content
```css
.modal-content {
  background-color: var(--color-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--space-6);
}
```

---

### Navigation

#### Sidebar
```css
.sidebar {
  width: 250px;
  background-color: var(--color-navy);
  color: var(--color-white);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
}
```

#### Nav Link
```css
.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  color: var(--color-gray-300);
  border-radius: var(--radius-lg);
  transition: all 0.2s;
  text-decoration: none;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
}

.nav-link.active {
  background-color: var(--color-gold);
  color: var(--color-navy);
}
```

---

### Feedback States

#### Success Message
```css
.alert-success {
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid var(--color-success);
  color: var(--color-success);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

#### Error Message
```css
.alert-error {
  background-color: rgba(220, 38, 38, 0.1);
  border: 1px solid var(--color-error);
  color: var(--color-error);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

#### Warning Message
```css
.alert-warning {
  background-color: rgba(245, 158, 11, 0.1);
  border: 1px solid var(--color-warning);
  color: var(--color-warning);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

#### Info Message
```css
.alert-info {
  background-color: rgba(59, 130, 246, 0.1);
  border: 1px solid var(--color-info);
  color: var(--color-info);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
```

---

### Loading States

#### Spinner
```css
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid var(--color-gray-200);
  border-top-color: var(--color-gold);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

#### Skeleton Loader
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-100) 50%,
    var(--color-gray-200) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

### Empty States

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  text-align: center;
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  color: var(--color-gray-400);
  margin-bottom: var(--space-4);
}

.empty-state-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-gray-700);
  margin-bottom: var(--space-2);
}

.empty-state-description {
  font-size: var(--text-base);
  color: var(--color-gray-500);
  margin-bottom: var(--space-6);
}
```

---

## Icon System

### Library: Lucide Icons

**Why:**
- Consistent with shadcn/ui
- Open source
- Good selection
- Customizable

### Icon Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| `icon-sm` | 16px | Inline icons, badges |
| `icon-md` | 20px | Navigation, buttons |
| `icon-lg` | 24px | Feature icons, headers |

### Icon Style

```css
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-sm {
  width: 16px;
  height: 16px;
}

.icon-md {
  width: 20px;
  height: 20px;
}

.icon-lg {
  width: 24px;
  height: 24px;
}

/* Stroke width */
.icon svg {
  stroke-width: 2;
}
```

### Icon Examples

```tsx
import { Home, Settings, User, Search } from 'lucide-react';

// Small icon
<Home className="icon-sm" />

// Medium icon
<Settings className="icon-md" />

// Large icon
<User className="icon-lg" />

// Icon with text
<button>
  <Search className="icon-md" />
  Search
</button>
```

---

## Dark Mode Implementation

### Toggle

```tsx
// Theme toggle component
const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
};
```

### CSS Variables

```css
/* Light mode (default) */
:root {
  --color-paper: #F2ECDD;
  --color-navy: #0F1B33;
  /* ... */
}

/* Dark mode */
.dark {
  --color-paper: #1A1A2E;
  --color-navy: #F2ECDD;
  /* ... */
}
```

### Tailwind Integration

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

---

## Accessibility

### Focus States

```css
/* Focus ring */
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}

/* Remove default outline */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Skip Link

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-gold);
  color: var(--color-navy);
  padding: var(--space-2) var(--space-4);
  z-index: 100;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}
```

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Responsive Patterns

### Mobile Navigation

```css
/* Mobile hamburger menu */
.mobile-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-gray-200);
  display: flex;
  justify-content: space-around;
  padding: var(--space-2);
  z-index: 40;
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}
```

### Responsive Typography

```css
/* Fluid typography */
.heading-1 {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  line-height: 1.2;
}

.heading-2 {
  font-size: clamp(1.25rem, 3vw, 1.875rem);
  line-height: 1.3;
}

.body-text {
  font-size: clamp(0.875rem, 2vw, 1rem);
  line-height: 1.5;
}
```

---

## Component Examples

### Project Card

```tsx
<Card className="card-interactive">
  <CardHeader>
    <CardTitle>GCE Mathematics</CardTitle>
    <CardDescription>Last accessed 2 hours ago</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex items-center gap-2">
      <Badge>GCE</Badge>
      <Badge variant="secondary">Mathematics</Badge>
    </div>
  </CardContent>
  <CardFooter>
    <Button>Continue Studying</Button>
  </CardFooter>
</Card>
```

### Chat Message

```tsx
<div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
  <div className={`max-w-[80%] rounded-xl px-4 py-2 ${
    isUser 
      ? 'bg-[var(--color-gold)] text-[var(--color-navy)]' 
      : 'bg-[var(--color-gray-100)] text-[var(--color-gray-900)]'
  }`}>
    {message.content}
  </div>
</div>
```

### Pricing Card

```tsx
<Card className="relative">
  {isPopular && (
    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
      Most Popular
    </Badge>
  )}
  <CardHeader>
    <CardTitle>Pro</CardTitle>
    <div className="text-3xl font-bold">
      5,000 <span className="text-base font-normal">XAF/month</span>
    </div>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li className="flex items-center gap-2">
        <Check className="text-[var(--color-success)]" />
        Unlimited projects
      </li>
      <li className="flex items-center gap-2">
        <Check className="text-[var(--color-success)]" />
        Unlimited AI messages
      </li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Subscribe Now</Button>
  </CardFooter>
</Card>
```

---

*Project Foundation System v1.0*
*Created by No1Vibecoder*
