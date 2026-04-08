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

## Starter Questions (10)

The correct answer and its index are listed below. The 3 plausible distractors for each question are defined in `src/content/quiz/index.yaml` during implementation — they should be believable wrong answers from the same domain (e.g. other frameworks, other cities, other roles).

### Tech (4)
1. "What framework is this portfolio built with?" → Astro (correctIndex: 1) — e.g. distractors: Next.js, Nuxt, SvelteKit
2. "What AWS certification does Farzad hold?" → Cloud Practitioner (correctIndex: 0)
3. "What is Farzad's area of specialisation?" → Cloud-native, AI-powered applications (correctIndex: 2)
4. "Which company did Farzad intern at as a Software Engineer?" → Tanda (correctIndex: 3)

### Personal (3)
5. "What hobby does Farzad enjoy outside of coding?" → Partner dancing (correctIndex: 1)
6. "Where is Farzad based?" → Brisbane, Australia (correctIndex: 0)
7. "What degree is Farzad completing?" → Computer Science at QUT (correctIndex: 2)

### Career (3)
8. "What role is Farzad seeking?" → Graduate Software Engineer (correctIndex: 1)
9. "When is Farzad available to start?" → July 2026 (correctIndex: 3)
10. "What does 'Agentic Software Engineer' mean in Farzad's context?" → Building AI agents and LLM-powered systems (correctIndex: 0)

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
