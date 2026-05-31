# Portfolio Quiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a "Think You Know Me?" trivia quiz at `/quiz` with 10 questions, a Hero CTA, and full Keystatic CMS support.

**Architecture:** Questions live in `src/content/quiz/index.yaml` as a data singleton, typed via Zod in `content.config.ts` and editable in Keystatic. The quiz page at `/quiz` fetches questions server-side and passes them to `Quiz.astro`, which handles all interactivity via a vanilla JS state machine in a `<script>` tag — no framework needed.

**Tech Stack:** Astro 5, DaisyUI 5, Tailwind CSS 4, Keystatic, TypeScript (strict), vanilla JS state machine

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/content/quiz/index.yaml` | All 10 quiz questions as YAML |
| Create | `src/components/Quiz.astro` | Quiz UI — 4 screens + JS state machine |
| Create | `src/pages/quiz.astro` | Quiz route — fetches questions, renders Quiz |
| Modify | `src/content.config.ts` | Add `quiz` collection + `showQuizCta` to `general` |
| Modify | `keystatic.config.ts` | Add `quiz` singleton + `showQuizCta` to general |
| Modify | `src/content/general/index.yaml` | Add `showQuizCta: true` |
| Modify | `src/components/Hero.astro` | Add `showQuizCta` prop + CTA button |
| Modify | `src/pages/index.astro` | Pass `general.showQuizCta` to `Hero` |

---

## Task 1: Add quiz schema to content.config.ts

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Add the quiz collection definition**

In `src/content.config.ts`, add the following after the `certifications` collection definition (before the `export const collections` line):

```ts
// Quiz singleton
const quiz = defineCollection({
  loader: glob({ pattern: "**/*.{yaml}", base: "./src/content/quiz" }),
  schema: z.object({
    questions: z.array(
      z.object({
        question: z.string(),
        options: z.array(z.string()).length(4),
        correctIndex: z.number().min(0).max(3),
        category: z.enum(["tech", "personal", "career"]),
        funFact: z.string().optional(),
      })
    ),
  }),
});
```

- [ ] **Step 2: Add `showQuizCta` to the general schema**

In the `general` collection's schema object in `src/content.config.ts`, add this line after `showContactSection: z.boolean()`:

```ts
showQuizCta: z.boolean().default(false),
```

Note: `.default(false)` is required here because the YAML file doesn't have this field yet — it gets added in Task 4. Without the default, `pnpm astro check` would fail.

- [ ] **Step 3: Export the quiz collection**

In the `export const collections` object at the bottom, add `quiz`:

```ts
export const collections = {
  hero,
  work,
  education,
  projects,
  hackathons,
  blog,
  about,
  general,
  contact,
  certifications,
  quiz,
};
```

- [ ] **Step 4: Run type check**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz && pnpm astro check
```

Expected: no errors (quiz content directory doesn't exist yet, that's fine — Astro won't error on a missing dir until you query it)

- [ ] **Step 5: Commit**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz
git add src/content.config.ts
git commit -m "feat: add quiz collection schema and showQuizCta to general"
```

---

## Task 2: Create quiz content YAML

**Files:**
- Create: `src/content/quiz/index.yaml`

- [ ] **Step 1: Create the content directory and YAML file**

Create `src/content/quiz/index.yaml` with this exact content:

```yaml
questions:
  - question: "What is Farzad's current GPA?"
    options:
      - "5.9"
      - "6.2"
      - "6.4"
      - "6.7"
    correctIndex: 3
    category: personal
    funFact: "Farzad is studying Computer Science at QUT and maintains a GPA of 6.7 out of 7."

  - question: "What AWS certification does Farzad hold?"
    options:
      - "Cloud Practitioner"
      - "Solutions Architect"
      - "Developer Associate"
      - "SysOps Administrator"
    correctIndex: 0
    category: tech
    funFact: "Farzad earned the AWS Certified Cloud Practitioner certification, demonstrating foundational cloud knowledge."

  - question: "How many countries has Farzad travelled to?"
    options:
      - "5"
      - "7"
      - "10"
      - "15"
    correctIndex: 2
    category: personal
    funFact: "Farzad has travelled to 10 countries — exploring the world is one of his favourite things to do."

  - question: "Which company did Farzad intern at?"
    options:
      - "Atlassian"
      - "Canva"
      - "Xero"
      - "Tanda"
    correctIndex: 3
    category: tech
    funFact: "Farzad completed a Software Engineer internship at Tanda, a workforce management platform based in Brisbane."

  - question: "What hobby does Farzad enjoy outside coding?"
    options:
      - "Skateboarding"
      - "Partner dancing"
      - "Playing guitar"
      - "Photography"
    correctIndex: 1
    category: personal
    funFact: "Farzad is a partner dancer — he enjoys the social and creative aspects of dancing as a break from screens."

  - question: "Where did Farzad grow up?"
    options:
      - "Brisbane, Australia"
      - "Sydney, Australia"
      - "Auckland, New Zealand"
      - "Christchurch, New Zealand"
    correctIndex: 3
    category: personal
    funFact: "Farzad grew up in Christchurch, New Zealand before moving to Brisbane, Australia to study."

  - question: "What degree is Farzad completing?"
    options:
      - "Software Engineering at UQ"
      - "Information Technology at Griffith"
      - "Computer Science at QUT"
      - "Data Science at QUT"
    correctIndex: 2
    category: personal
    funFact: "Farzad is in his final semester of a Bachelor of Computer Science at Queensland University of Technology (QUT)."

  - question: "Which languages does Farzad speak?"
    options:
      - "English and Mandarin"
      - "English and Farsi"
      - "English and Spanish"
      - "English and French"
    correctIndex: 1
    category: personal
    funFact: "Farzad speaks English and Farsi (Persian) natively, and is currently learning Portuguese as a third language."

  - question: "When is Farzad available to start?"
    options:
      - "January 2026"
      - "March 2026"
      - "May 2026"
      - "July 2026"
    correctIndex: 3
    category: career
    funFact: "Farzad finishes his final semester at QUT in mid-2026 and is actively seeking Graduate Software Engineer roles from July 2026."

  - question: "What is Farzad's favourite dance style?"
    options:
      - "Salsa"
      - "Tango"
      - "Bachata"
      - "Lambada"
    correctIndex: 3
    category: personal
    funFact: "Lambada is Farzad's favourite — it's a Brazilian partner dance known for its expressive, flowing movements."
```

- [ ] **Step 2: Run type check**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz && pnpm astro check
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz
git add src/content/quiz/index.yaml
git commit -m "feat: add quiz question content"
```

---

## Task 3: Add quiz singleton to Keystatic

**Files:**
- Modify: `keystatic.config.ts`

- [ ] **Step 1: Add quiz singleton to the singletons object**

In `keystatic.config.ts`, add this inside `singletons: { ... }` after the `contact` singleton:

```ts
quiz: singleton({
  label: "Quiz",
  path: "src/content/quiz/",
  schema: {
    questions: fields.array(
      fields.object({
        question: fields.text({
          label: "Question",
          validation: { isRequired: true },
        }),
        options: fields.array(
          fields.text({ label: "Option", validation: { isRequired: true } }),
          {
            label: "Options",
            description: "Exactly 4 options required",
            itemLabel: (props) => props.value || "Option",
          }
        ),
        correctIndex: fields.integer({
          label: "Correct Answer Index (0–3)",
          description: "0 = first option, 1 = second, 2 = third, 3 = fourth",
          validation: { isRequired: true, min: 0, max: 3 },
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "🛠 Tech", value: "tech" },
            { label: "🎯 Personal", value: "personal" },
            { label: "💼 Career", value: "career" },
          ],
          defaultValue: "personal",
        }),
        funFact: fields.text({
          label: "Fun Fact",
          multiline: true,
          description: "Shown after the answer is revealed (optional)",
        }),
      }),
      {
        label: "Questions",
        itemLabel: (props) => props.fields.question.value || "New Question",
      }
    ),
  },
}),
```

- [ ] **Step 2: Add showQuizCta checkbox to the general singleton schema**

In `keystatic.config.ts`, inside `singletons.general.schema`, add after the `showContactSection` checkbox:

```ts
showQuizCta: fields.checkbox({
  label: "Show Quiz CTA in Hero",
  description: 'Show "Think you know me? →" button in the Hero section',
  defaultValue: true,
}),
```

- [ ] **Step 3: Run type check**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz && pnpm astro check
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz
git add keystatic.config.ts
git commit -m "feat: add quiz singleton and showQuizCta to Keystatic config"
```

---

## Task 4: Enable showQuizCta in general settings

**Files:**
- Modify: `src/content/general/index.yaml`

- [ ] **Step 1: Add showQuizCta to general/index.yaml**

In `src/content/general/index.yaml`, add this line at the end of the file:

```yaml
showQuizCta: true
```

- [ ] **Step 2: Run type check**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz && pnpm astro check
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz
git add src/content/general/index.yaml
git commit -m "feat: enable quiz CTA in general settings"
```

---

## Task 5: Add quiz CTA to Hero

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add showQuizCta prop to Hero.astro**

In `src/components/Hero.astro`, update the Props interface to add `showQuizCta`:

```ts
interface Props {
  hero: {
    name: string;
    title: string;
    description: string;
    avatar: ImageMetadata | string;
    location?: string;
    socialLinks: Array<{
      url: string;
      icon: string;
      label: string;
    }>;
  };
  showQuizCta?: boolean;
}

const { hero, showQuizCta } = Astro.props;
```

- [ ] **Step 2: Add the CTA button in Hero.astro**

In `src/components/Hero.astro`, add the quiz CTA button after the social links `<div>`. The full social links block currently ends with `</div>` closing the grid/flex container. Add this immediately after that closing tag (still inside the `<div class="max-w-2xl ...">` wrapper):

```astro
{
  showQuizCta && (
    <div class="mt-4">
      <a href="/quiz" class="btn btn-outline btn-secondary">
        Think you know me? →
      </a>
    </div>
  )
}
```

- [ ] **Step 3: Pass showQuizCta from index.astro to Hero**

In `src/pages/index.astro`, update the `<Hero>` component call from:

```astro
<Hero hero={heroEntry.data} />
```

to:

```astro
<Hero hero={heroEntry.data} showQuizCta={general.showQuizCta} />
```

- [ ] **Step 4: Run type check**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz && pnpm astro check
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add quiz CTA button to Hero section"
```

---

## Task 6: Create Quiz.astro component

**Files:**
- Create: `src/components/Quiz.astro`

- [ ] **Step 1: Create Quiz.astro**

Create `src/components/Quiz.astro` with this full content:

```astro
---
type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  category: "tech" | "personal" | "career";
  funFact?: string;
};

interface Props {
  questions: QuizQuestion[];
}

const { questions } = Astro.props;
---

<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
  <div
    id="quiz-root"
    class="card bg-base-100 shadow-xl w-full max-w-lg"
    data-questions={JSON.stringify(questions)}
  >
    <!-- Screen: Intro -->
    <div id="screen-intro" class="card-body items-center text-center gap-4 py-12">
      <div class="text-6xl">🧠</div>
      <h1 class="card-title text-2xl">Think You Know Me?</h1>
      <p class="text-base-content/70 max-w-sm">
        10 questions across tech, projects, and personal facts. How well do you
        really know Farzad?
      </p>
      <p class="text-sm text-base-content/40">~2 minutes</p>
      <button id="btn-start" class="btn btn-primary btn-wide mt-2">
        Start Quiz →
      </button>
    </div>

    <!-- Screen: Question -->
    <div id="screen-question" class="card-body gap-4 hidden">
      <div class="flex justify-between items-center">
        <span id="q-counter" class="text-sm text-base-content/60"></span>
        <span id="q-category" class="badge badge-primary"></span>
      </div>
      <progress
        id="q-progress"
        class="progress progress-primary w-full"
        value="0"
        max="10"
      ></progress>
      <p id="q-text" class="text-lg font-semibold mt-2"></p>
      <div id="q-options" class="flex flex-col gap-2"></div>
      <button id="btn-confirm" class="btn btn-primary mt-2 hidden">
        Confirm →
      </button>
    </div>

    <!-- Screen: Reveal -->
    <div id="screen-reveal" class="card-body gap-4 hidden">
      <p id="reveal-indicator" class="text-center text-2xl font-bold"></p>
      <div id="reveal-correct" class="alert"></div>
      <p id="reveal-fact" class="text-sm text-base-content/70 italic hidden"></p>
      <button id="btn-next" class="btn btn-primary mt-2"></button>
    </div>

    <!-- Screen: Results -->
    <div id="screen-results" class="card-body items-center text-center gap-4 py-10 hidden">
      <div class="text-5xl">🏆</div>
      <h2 class="text-2xl font-bold">
        You scored <span id="r-score"></span>
      </h2>
      <div id="r-stars" class="text-3xl"></div>
      <div id="r-label" class="badge badge-secondary badge-lg py-4"></div>
      <div class="flex gap-2 flex-wrap justify-center mt-2">
        <button id="btn-share" class="btn btn-info btn-sm">Share result</button>
        <button id="btn-retry" class="btn btn-ghost btn-sm">Try again</button>
        <a href="/" class="btn btn-ghost btn-sm">← Portfolio</a>
      </div>
    </div>
  </div>
</div>

<script>
  // ---- Types ----
  type Question = {
    question: string;
    options: string[];
    correctIndex: number;
    category: string;
    funFact?: string;
  };

  // ---- State ----
  const root = document.getElementById("quiz-root") as HTMLElement;
  const questions: Question[] = JSON.parse(root.dataset.questions!);
  const state = { index: 0, score: 0, selected: null as number | null };

  // ---- Helpers ----
  const SCREENS = ["screen-intro", "screen-question", "screen-reveal", "screen-results"];

  function showOnly(id: string) {
    SCREENS.forEach((s) =>
      document.getElementById(s)!.classList.toggle("hidden", s !== id)
    );
  }

  function el<T extends HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
  }

  // ---- Intro ----
  el("btn-start").addEventListener("click", () => {
    state.index = 0;
    state.score = 0;
    renderQuestion();
  });

  // ---- Question ----
  function renderQuestion() {
    const q = questions[state.index];
    state.selected = null;

    el("q-counter").textContent = `Question ${state.index + 1} of ${questions.length}`;

    const labels: Record<string, string> = {
      tech: "🛠 Tech",
      personal: "🎯 Personal",
      career: "💼 Career",
    };
    el("q-category").textContent = labels[q.category] ?? q.category;

    (el("q-progress") as HTMLProgressElement).value = state.index;
    el("q-text").textContent = q.question;

    const optionsEl = el("q-options");
    optionsEl.innerHTML = "";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline text-left justify-start";
      btn.textContent = opt;
      btn.addEventListener("click", () => selectOption(i));
      optionsEl.appendChild(btn);
    });

    el("btn-confirm").classList.add("hidden");
    showOnly("screen-question");
  }

  function selectOption(i: number) {
    state.selected = i;
    el("q-options")
      .querySelectorAll("button")
      .forEach((btn, idx) => {
        btn.className =
          idx === i
            ? "btn btn-primary text-left justify-start"
            : "btn btn-outline text-left justify-start";
      });
    el("btn-confirm").classList.remove("hidden");
  }

  el("btn-confirm").addEventListener("click", () => {
    if (state.selected === null) return;
    const q = questions[state.index];
    const correct = state.selected === q.correctIndex;
    if (correct) state.score++;
    renderReveal(correct, q);
  });

  // ---- Reveal ----
  function renderReveal(correct: boolean, q: Question) {
    el("reveal-indicator").textContent = correct ? "✓ Correct!" : "✗ Wrong";
    el("reveal-indicator").className = `text-center text-2xl font-bold ${
      correct ? "text-success" : "text-error"
    }`;

    el("reveal-correct").className = `alert ${
      correct ? "alert-success" : "alert-error"
    }`;
    el("reveal-correct").textContent = `The answer is: ${q.options[q.correctIndex]}`;

    const factEl = el("reveal-fact");
    if (q.funFact) {
      factEl.textContent = q.funFact;
      factEl.classList.remove("hidden");
    } else {
      factEl.classList.add("hidden");
    }

    const isLast = state.index === questions.length - 1;
    el("btn-next").textContent = isLast ? "See Results →" : "Next →";

    showOnly("screen-reveal");
  }

  el("btn-next").addEventListener("click", () => {
    state.index++;
    if (state.index >= questions.length) {
      renderResults();
    } else {
      renderQuestion();
    }
  });

  // ---- Results ----
  const SCORE_LABELS = [
    { max: 3, label: "Who are you?" },
    { max: 6, label: "Getting there…" },
    { max: 9, label: "Practically a stalker" },
    { max: 10, label: "Are you Farzad?" },
  ];

  function getStars(score: number, total: number): string {
    const stars = Math.round((score / total) * 5);
    return "⭐".repeat(stars) + "☆".repeat(5 - stars);
  }

  function renderResults() {
    const total = questions.length;
    el("r-score").textContent = `${state.score} / ${total}`;
    el("r-stars").textContent = getStars(state.score, total);
    el("r-label").textContent =
      SCORE_LABELS.find((l) => state.score <= l.max)?.label ?? "Are you Farzad?";
    showOnly("screen-results");
  }

  el("btn-retry").addEventListener("click", () => {
    state.index = 0;
    state.score = 0;
    renderQuestion();
  });

  el("btn-share").addEventListener("click", () => {
    const total = questions.length;
    const label =
      SCORE_LABELS.find((l) => state.score <= l.max)?.label ?? "Are you Farzad?";
    const text = `I scored ${state.score}/${total} on Farzad's portfolio quiz! "${label}" 🧠\nTry it: ${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      const btn = el("btn-share");
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = "Share result";
      }, 2000);
    });
  });
</script>
```

- [ ] **Step 2: Run type check**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz && pnpm astro check
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz
git add src/components/Quiz.astro
git commit -m "feat: add Quiz component with full state machine"
```

---

## Task 7: Create the quiz page

**Files:**
- Create: `src/pages/quiz.astro`

- [ ] **Step 1: Create src/pages/quiz.astro**

```astro
---
import Layout from "../layouts/Layout.astro";
import Quiz from "../components/Quiz.astro";
import { getEntry } from "astro:content";

const quizEntry = await getEntry("quiz", "index");
const questions = quizEntry!.data.questions;
---

<Layout
  title="Think You Know Me? — Quiz"
  description="10 questions about Farzad Hayat. How well do you know him?"
>
  <Quiz questions={questions} />
</Layout>
```

- [ ] **Step 2: Run type check**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz && pnpm astro check
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz
git add src/pages/quiz.astro
git commit -m "feat: add /quiz page"
```

---

## Task 8: Build verification

- [ ] **Step 1: Run full build**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz && pnpm build
```

Expected: Build completes successfully with no errors. Output in `./dist/`.

- [ ] **Step 2: Start dev server and verify visually**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz && pnpm dev
```

Open `http://localhost:4321` and verify:
- Hero section shows "Think you know me? →" button
- Clicking it navigates to `/quiz`
- Intro screen renders correctly
- "Start Quiz →" begins the quiz
- Each question shows progress bar, category badge, 4 options
- Selecting an option highlights it and shows "Confirm →"
- Confirming shows the reveal screen with correct/wrong indicator and fun fact
- "Next →" advances to next question; "See Results →" appears on question 10
- Results screen shows score, stars, label
- "Try again" resets to question 1
- "Share result" copies text to clipboard and briefly shows "Copied!"
- "← Portfolio" returns to `/`

- [ ] **Step 3: Verify Keystatic CMS at /keystatic**

Open `http://localhost:4321/keystatic` and verify:
- "Quiz" appears in the singletons sidebar
- Questions are listed and editable
- "General Settings" has a "Show Quiz CTA in Hero" checkbox

- [ ] **Step 4: Final commit**

```bash
cd /home/farzad/portfolio/.worktrees/feat-quiz
git add -A
git commit -m "feat: complete portfolio quiz implementation"
```
