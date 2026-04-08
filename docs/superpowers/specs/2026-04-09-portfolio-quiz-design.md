# Portfolio Quiz — Design Spec
**Date:** 2026-04-09  
**Branch:** `feat/portfolio-quiz`  
**Status:** Approved

---

## Overview

A "Think You Know Me?" trivia quiz at `/quiz` — a personalized mini-game for portfolio visitors. The goal is to be memorable to recruiters and hiring managers while being fun for fellow developers. Questions span tech stack, projects, and personal facts about Farzad.

---

## User Flow

```
Hero CTA button → /quiz → Intro screen → Questions (×10) → Results screen
                                              ↓ after each answer
                                         Answer reveal + fun fact
```

### Screen 1 — Intro
- Emoji header, title ("Think You Know Me?"), one-line description, estimated time (~2 min), "Start Quiz →" CTA.

### Screen 2 — Question
- Progress bar (e.g. "Question 4 of 10")
- Category badge (🛠 Tech / 🎯 Personal / 💼 Career)
- Question text
- 4 answer options as clickable buttons; selected option highlights
- "Confirm" button appears after an option is selected
- No timer (low-pressure, fun tone)

### Screen 2b — Answer Reveal
- ✓ Correct / ✗ Wrong indicator with the correct answer shown
- Optional fun fact (1–2 sentences) surfaced after each answer
- "Next →" button to advance

### Screen 3 — Results
- Score display (X / 10)
- Funny label based on score:
  - 0–3: "Who are you?"
  - 4–6: "Getting there…"
  - 7–9: "Practically a stalker"
  - 10: "Are you Farzad?"
- Star rating (1–5 stars)
- Actions: Share result | Try again | ← Back to portfolio

---

## Architecture

### New Files

| File | Purpose |
|------|---------|
| `src/content/quiz/index.yaml` | Singleton — array of 10 questions |
| `src/pages/quiz.astro` | Page — fetches questions server-side, passes to Quiz component |
| `src/components/Quiz.astro` | All quiz UI + vanilla JS state machine |

### Modified Files

| File | Change |
|------|--------|
| `src/content.config.ts` | Add `quiz` singleton with Zod schema |
| `keystatic.config.ts` | Add `quiz` singleton + `showQuizCta` checkbox to general settings |
| `src/content/general/index.yaml` | Add `showQuizCta: true` field |
| `src/components/Hero.astro` | Add `showQuizCta` prop; render CTA button conditionally |
| `src/pages/index.astro` | Pass `general.showQuizCta` to Hero component |

---

## Data Model

Each question in `src/content/quiz/index.yaml`:

```yaml
questions:
  - question: "What framework is this portfolio built with?"
    options:
      - "Next.js"
      - "Astro"
      - "Nuxt"
      - "SvelteKit"
    correctIndex: 1
    category: tech        # tech | personal | career
    funFact: "Astro 5 ships zero JS by default and uses Content Collections for type-safe content."
```

### Zod Schema (`src/content.config.ts`)

```ts
const quizQuestion = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctIndex: z.number().min(0).max(3),
  category: z.enum(["tech", "personal", "career"]),
  funFact: z.string().optional(),
});

// quiz singleton
const quiz = defineCollection({
  type: "data",
  schema: z.object({
    questions: z.array(quizQuestion),
  }),
});
```

---

## Quiz State Machine (vanilla JS)

States: `intro | question | reveal | results`

```
intro
  → [Start Quiz] → question (index 0)

question
  → [Select option] → option highlighted
  → [Confirm] → reveal

reveal
  → [Next] → question (index + 1)
           → results (if last question)

results
  → [Try again] → question (index 0), score reset
  → [Share] → copy shareable text to clipboard
  → [← Portfolio] → navigate to /
```

All state lives in a single JS object; no framework needed.

---

## Questions (10)

Full options and correct answers (0-indexed):

| # | Question | Options (0→3) | correctIndex | Category |
|---|----------|---------------|--------------|----------|
| 1 | What is Farzad's current GPA? | 5.9 / 6.2 / 6.4 / 6.7 | 3 | personal |
| 2 | What AWS certification does Farzad hold? | Cloud Practitioner / Solutions Architect / Developer Associate / SysOps Administrator | 0 | tech |
| 3 | How many countries has Farzad travelled to? | 5 / 7 / 10 / 15 | 2 | personal |
| 4 | Which company did Farzad intern at? | Atlassian / Canva / Xero / Tanda | 3 | tech |
| 5 | What hobby does Farzad enjoy outside coding? | Skateboarding / Partner dancing / Playing guitar / Photography | 1 | personal |
| 6 | Where did Farzad grow up? | Brisbane, Australia / Sydney, Australia / Auckland, NZ / Christchurch, New Zealand | 3 | personal |
| 7 | What degree is Farzad completing? | Software Engineering at UQ / IT at Griffith / Computer Science at QUT / Data Science at QUT | 2 | personal |
| 8 | Which languages does Farzad speak? | English and Mandarin / English and Farsi / English and Spanish / English and French | 1 | personal |
| 9 | When is Farzad available to start? | January 2026 / March 2026 / May 2026 / July 2026 | 3 | career |
| 10 | What is Farzad's favourite dance style? | Salsa / Tango / Bachata / Lambada | 3 | personal |

---

## Hero CTA

In `Hero.astro`, add a `showQuizCta?: boolean` prop and conditionally render a link button:

```astro
interface Props {
  hero: { ... };         // existing
  showQuizCta?: boolean; // new
}
const { hero, showQuizCta } = Astro.props;

{showQuizCta && (
  <a href="/quiz" class="btn btn-outline btn-secondary">
    Think you know me? →
  </a>
)}
```

In `src/pages/index.astro`, pass `showQuizCta={general.showQuizCta}` to the Hero component.

Placed alongside the existing social link buttons.

---

## Styling

- Page background: `bg-base-200` (works across all DaisyUI themes)
- Quiz card: `bg-base-100 rounded-box shadow-xl`
- Correct answer: `btn-success` 
- Wrong answer: `btn-error`
- Category badges: DaisyUI `badge` component (`badge-primary` tech, `badge-secondary` personal, `badge-accent` career)
- Progress bar: DaisyUI `progress` component
- No custom CSS — DaisyUI utilities only

---

## Out of Scope

- Timer per question
- Backend score persistence / leaderboard
- Animated transitions between screens (can be added later)
- Mobile-specific layout differences (DaisyUI responsive by default)
